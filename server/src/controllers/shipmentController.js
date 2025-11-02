const { PrismaClient } = require('@prisma/client');
const { generateTrackingNumber } = require('../utils/generateTrackingNumber');

const prisma = new PrismaClient();

/**
 * @desc    Get all shipments for logged-in user with advanced filtering
 * @route   GET /api/shipments
 * @access  Private
 */
const getShipments = async (req, res) => {
  try {
    const {
      status,
      search,
      dateFrom,
      dateTo,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    // Build where clause
    const where = { userId: req.user.id };

    // Filter by status
    if (status && status !== 'all') {
      where.status = status;
    }

    // Search by tracking number, origin, or destination
    if (search) {
      where.OR = [
        { trackingNumber: { contains: search, mode: 'insensitive' } },
        { origin: { contains: search, mode: 'insensitive' } },
        { destination: { contains: search, mode: 'insensitive' } },
        { senderName: { contains: search, mode: 'insensitive' } },
        { receiverName: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Filter by date range
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        where.createdAt.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.createdAt.lte = new Date(dateTo);
      }
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Get total count for pagination
    const total = await prisma.shipment.count({ where });

    // Get shipments with filters and pagination
    const shipments = await prisma.shipment.findMany({
      where,
      include: {
        documents: {
          select: {
            id: true,
            documentType: true,
            originalName: true,
            uploadedAt: true,
          },
        },
        statusHistory: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take,
    });

    res.json({
      shipments,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get shipments error:', error);
    res.status(500).json({ message: 'Server error fetching shipments' });
  }
};

/**
 * @desc    Get single shipment by ID
 * @route   GET /api/shipments/:id
 * @access  Private
 */
const getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const shipment = await prisma.shipment.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
      include: {
        documents: {
          orderBy: { uploadedAt: 'desc' },
        },
        statusHistory: {
          orderBy: { timestamp: 'asc' },
        },
      },
    });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.json(shipment);
  } catch (error) {
    console.error('Get shipment by ID error:', error);
    res.status(500).json({ message: 'Server error fetching shipment' });
  }
};

/**
 * @desc    Create new shipment
 * @route   POST /api/shipments
 * @access  Private
 */
const createShipment = async (req, res) => {
  try {
    const {
      origin,
      destination,
      weight,
      volume,
      senderName,
      senderAddress,
      receiverName,
      receiverAddress,
      receiverPhone,
      estimatedCost,
    } = req.body;

    // Validation
    if (!origin || !destination || !weight || !volume) {
      return res.status(400).json({ 
        message: 'Please provide origin, destination, weight, and volume' 
      });
    }

    // Generate tracking number
    const trackingNumber = generateTrackingNumber();

    // Create shipment
    const shipment = await prisma.shipment.create({
      data: {
        userId: req.user.id,
        trackingNumber,
        origin,
        destination,
        weight: parseFloat(weight),
        volume: parseFloat(volume),
        senderName,
        senderAddress,
        receiverName,
        receiverAddress,
        receiverPhone,
        estimatedCost: estimatedCost ? parseFloat(estimatedCost) : null,
        status: 'PICKED_UP',
        statusHistory: {
          create: {
            status: 'PICKED_UP',
            description: 'Shipment has been picked up',
            location: origin,
          },
        },
      },
      include: {
        statusHistory: true,
      },
    });

    res.status(201).json(shipment);
  } catch (error) {
    console.error('Create shipment error:', error);
    res.status(500).json({ message: 'Server error creating shipment' });
  }
};

/**
 * @desc    Update shipment status
 * @route   PATCH /api/shipments/:id/status
 * @access  Private
 */
const updateShipmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, description, location } = req.body;

    // Verify ownership
    const shipment = await prisma.shipment.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Update shipment and create history entry
    const updatedShipment = await prisma.shipment.update({
      where: { id: parseInt(id) },
      data: {
        status,
        statusHistory: {
          create: {
            status,
            description,
            location,
          },
        },
      },
      include: {
        statusHistory: {
          orderBy: { timestamp: 'desc' },
        },
      },
    });

    res.json(updatedShipment);
  } catch (error) {
    console.error('Update shipment status error:', error);
    res.status(500).json({ message: 'Server error updating shipment' });
  }
};

/**
 * @desc    Get shipment statistics for dashboard
 * @route   GET /api/shipments/stats
 * @access  Private
 */
const getShipmentStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [total, inTransit, delivered] = await Promise.all([
      prisma.shipment.count({ where: { userId } }),
      prisma.shipment.count({ 
        where: { 
          userId,
          status: { in: ['IN_TRANSIT', 'AT_PORT', 'CUSTOMS_CLEARANCE', 'OUT_FOR_DELIVERY'] }
        } 
      }),
      prisma.shipment.count({ 
        where: { userId, status: 'DELIVERED' } 
      }),
    ]);

    res.json({
      total,
      active: inTransit,
      inTransit,
      delivered,
    });
  } catch (error) {
    console.error('Get shipment stats error:', error);
    res.status(500).json({ message: 'Server error fetching statistics' });
  }
};

module.exports = {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipmentStatus,
  getShipmentStats,
};
