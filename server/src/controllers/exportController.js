const { PrismaClient } = require('@prisma/client');
const { generateShipmentsPDF, generateSingleShipmentPDF } = require('../utils/pdfGenerator');
const { generateShipmentsExcel, generateSingleShipmentExcel } = require('../utils/excelGenerator');

const prisma = new PrismaClient();

/**
 * Export all shipments as PDF
 * @route GET /api/export/shipments/pdf
 */
const exportShipmentsPDF = async (req, res) => {
  try {
    const shipments = await prisma.shipment.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    generateShipmentsPDF(shipments, res);
  } catch (error) {
    console.error('Export shipments PDF error:', error);
    res.status(500).json({ message: 'Error generating PDF report' });
  }
};

/**
 * Export all shipments as Excel
 * @route GET /api/export/shipments/excel
 */
const exportShipmentsExcel = async (req, res) => {
  try {
    const shipments = await prisma.shipment.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    await generateShipmentsExcel(shipments, res);
  } catch (error) {
    console.error('Export shipments Excel error:', error);
    res.status(500).json({ message: 'Error generating Excel report' });
  }
};

/**
 * Export single shipment as PDF
 * @route GET /api/export/shipment/:id/pdf
 */
const exportSingleShipmentPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const shipment = await prisma.shipment.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
      include: {
        documents: true,
        statusHistory: {
          orderBy: { timestamp: 'asc' },
        },
      },
    });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    generateSingleShipmentPDF(shipment, res);
  } catch (error) {
    console.error('Export single shipment PDF error:', error);
    res.status(500).json({ message: 'Error generating PDF report' });
  }
};

/**
 * Export single shipment as Excel
 * @route GET /api/export/shipment/:id/excel
 */
const exportSingleShipmentExcel = async (req, res) => {
  try {
    const { id } = req.params;

    const shipment = await prisma.shipment.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
      include: {
        documents: true,
        statusHistory: {
          orderBy: { timestamp: 'asc' },
        },
      },
    });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    await generateSingleShipmentExcel(shipment, res);
  } catch (error) {
    console.error('Export single shipment Excel error:', error);
    res.status(500).json({ message: 'Error generating Excel report' });
  }
};

module.exports = {
  exportShipmentsPDF,
  exportShipmentsExcel,
  exportSingleShipmentPDF,
  exportSingleShipmentExcel,
};
