const prisma = require('../config/database');

// Get analytics overview
const getOverview = async (req, res) => {
  try {
    const userId = req.user.role === 'ADMIN' ? undefined : req.user.id;

    // Total shipments
    const totalShipments = await prisma.shipment.count({
      where: userId ? { userId } : undefined
    });

    // Shipments by status
    const shipmentsByStatus = await prisma.shipment.groupBy({
      by: ['status'],
      _count: { id: true },
      where: userId ? { userId } : undefined
    });

    // Revenue by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const shipments = await prisma.shipment.findMany({
      where: {
        ...(userId && { userId }),
        createdAt: { gte: sixMonthsAgo }
      },
      select: {
        totalCost: true,
        createdAt: true,
        status: true
      }
    });

    // Group by month
    const revenueByMonth = {};
    shipments.forEach(shipment => {
      const month = new Date(shipment.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      if (!revenueByMonth[month]) {
        revenueByMonth[month] = 0;
      }
      revenueByMonth[month] += parseFloat(shipment.totalCost);
    });

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentShipments = await prisma.shipment.count({
      where: {
        ...(userId && { userId }),
        createdAt: { gte: sevenDaysAgo }
      }
    });

    // Average delivery time
    const deliveredShipments = await prisma.shipment.findMany({
      where: {
        ...(userId && { userId }),
        status: 'DELIVERED'
      },
      select: {
        createdAt: true,
        updatedAt: true
      }
    });

    let avgDeliveryTime = 0;
    if (deliveredShipments.length > 0) {
      const totalDays = deliveredShipments.reduce((sum, shipment) => {
        const days = Math.floor(
          (new Date(shipment.updatedAt) - new Date(shipment.createdAt)) / (1000 * 60 * 60 * 24)
        );
        return sum + days;
      }, 0);
      avgDeliveryTime = Math.round(totalDays / deliveredShipments.length);
    }

    res.json({
      totalShipments,
      shipmentsByStatus: shipmentsByStatus.map(item => ({
        status: item.status,
        count: item._count.id
      })),
      revenueByMonth: Object.entries(revenueByMonth).map(([month, revenue]) => ({
        month,
        revenue: parseFloat(revenue.toFixed(2))
      })),
      recentActivity: recentShipments,
      avgDeliveryTime
    });
  } catch (error) {
    console.error('Get overview error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
};

// Get shipment trends (daily for last 30 days)
const getShipmentTrends = async (req, res) => {
  try {
    const userId = req.user.role === 'ADMIN' ? undefined : req.user.id;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const shipments = await prisma.shipment.findMany({
      where: {
        ...(userId && { userId }),
        createdAt: { gte: thirtyDaysAgo }
      },
      select: {
        createdAt: true,
        status: true
      }
    });

    // Group by date
    const trendsByDate = {};
    shipments.forEach(shipment => {
      const date = new Date(shipment.createdAt).toLocaleDateString('en-US');
      if (!trendsByDate[date]) {
        trendsByDate[date] = { PENDING: 0, IN_TRANSIT: 0, DELIVERED: 0, CANCELLED: 0 };
      }
      trendsByDate[date][shipment.status]++;
    });

    const trends = Object.entries(trendsByDate).map(([date, statuses]) => ({
      date,
      ...statuses,
      total: Object.values(statuses).reduce((a, b) => a + b, 0)
    }));

    res.json(trends);
  } catch (error) {
    console.error('Get trends error:', error);
    res.status(500).json({ message: 'Failed to fetch trends' });
  }
};

// Get revenue statistics
const getRevenueStats = async (req, res) => {
  try {
    const userId = req.user.role === 'ADMIN' ? undefined : req.user.id;

    // Total revenue
    const result = await prisma.shipment.aggregate({
      where: userId ? { userId } : undefined,
      _sum: { totalCost: true }
    });

    const totalRevenue = parseFloat(result._sum.totalCost || 0);

    // Revenue by service type
    const revenueByService = await prisma.shipment.groupBy({
      by: ['serviceType'],
      _sum: { totalCost: true },
      where: userId ? { userId } : undefined
    });

    // This month vs last month
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const lastMonth = new Date(thisMonth);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const thisMonthRevenue = await prisma.shipment.aggregate({
      where: {
        ...(userId && { userId }),
        createdAt: { gte: thisMonth }
      },
      _sum: { totalCost: true }
    });

    const lastMonthRevenue = await prisma.shipment.aggregate({
      where: {
        ...(userId && { userId }),
        createdAt: {
          gte: lastMonth,
          lt: thisMonth
        }
      },
      _sum: { totalCost: true }
    });

    const thisMonthTotal = parseFloat(thisMonthRevenue._sum.totalCost || 0);
    const lastMonthTotal = parseFloat(lastMonthRevenue._sum.totalCost || 0);
    const growth = lastMonthTotal > 0 
      ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal * 100).toFixed(2)
      : 0;

    res.json({
      totalRevenue: totalRevenue.toFixed(2),
      revenueByService: revenueByService.map(item => ({
        serviceType: item.serviceType,
        revenue: parseFloat(item._sum.totalCost).toFixed(2)
      })),
      thisMonth: thisMonthTotal.toFixed(2),
      lastMonth: lastMonthTotal.toFixed(2),
      growth: parseFloat(growth)
    });
  } catch (error) {
    console.error('Get revenue stats error:', error);
    res.status(500).json({ message: 'Failed to fetch revenue statistics' });
  }
};

module.exports = {
  getOverview,
  getShipmentTrends,
  getRevenueStats
};
