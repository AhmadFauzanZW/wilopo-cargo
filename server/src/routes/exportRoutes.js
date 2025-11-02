const express = require('express');
const {
  exportShipmentsPDF,
  exportShipmentsExcel,
  exportSingleShipmentPDF,
  exportSingleShipmentExcel,
} = require('../controllers/exportController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Export all shipments
router.get('/shipments/pdf', exportShipmentsPDF);
router.get('/shipments/excel', exportShipmentsExcel);

// Export single shipment
router.get('/shipment/:id/pdf', exportSingleShipmentPDF);
router.get('/shipment/:id/excel', exportSingleShipmentExcel);

module.exports = router;
