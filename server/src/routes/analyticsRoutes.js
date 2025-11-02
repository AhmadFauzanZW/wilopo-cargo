const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.get('/overview', protect, analyticsController.getOverview);
router.get('/trends', protect, analyticsController.getShipmentTrends);
router.get('/revenue', protect, analyticsController.getRevenueStats);

module.exports = router;
