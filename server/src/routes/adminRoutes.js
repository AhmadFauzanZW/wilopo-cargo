const express = require('express');
const router = express.Router();
const prisma = require('../config/database');
const { protect, isAdmin } = require('../middleware/auth');

// Get all users (Admin only)
router.get('/users', protect, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        createdAt: true,
        _count: {
          select: { shipments: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Update user role (Admin only)
router.put('/users/:id/role', protect, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['USER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { role },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
});

// Get user statistics (Admin only)
router.get('/stats', protect, isAdmin, async (req, res) => {
  try {
    const [totalUsers, totalShipments, totalRevenue] = await Promise.all([
      prisma.user.count(),
      prisma.shipment.count(),
      prisma.shipment.aggregate({
        _sum: { totalCost: true }
      })
    ]);

    res.json({
      totalUsers,
      totalShipments,
      totalRevenue: parseFloat(totalRevenue._sum.totalCost || 0).toFixed(2)
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
});

module.exports = router;
