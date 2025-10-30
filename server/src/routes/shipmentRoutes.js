const express = require('express');
const {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipmentStatus,
  getShipmentStats,
} = require('../controllers/shipmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

router.route('/').get(getShipments).post(createShipment);
router.route('/stats').get(getShipmentStats);
router.route('/:id').get(getShipmentById);
router.route('/:id/status').patch(updateShipmentStatus);

module.exports = router;
