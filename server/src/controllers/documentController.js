const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Allow only specific file types
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images, PDFs, and office documents are allowed'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter,
});

/**
 * @desc    Upload document for shipment
 * @route   POST /api/shipments/:id/documents
 * @access  Private
 */
const uploadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { documentType } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Verify shipment belongs to user
    const shipment = await prisma.shipment.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    });

    if (!shipment) {
      // Delete uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Create document record
    const document = await prisma.document.create({
      data: {
        shipmentId: parseInt(id),
        documentType: documentType || 'OTHER',
        fileUrl: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname,
        fileSize: req.file.size,
      },
    });

    res.status(201).json(document);
  } catch (error) {
    console.error('Upload document error:', error);
    // Clean up file on error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Server error uploading document' });
  }
};

/**
 * @desc    Get documents for shipment
 * @route   GET /api/shipments/:id/documents
 * @access  Private
 */
const getDocuments = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify shipment belongs to user
    const shipment = await prisma.shipment.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
      include: {
        documents: {
          orderBy: { uploadedAt: 'desc' },
        },
      },
    });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.json(shipment.documents);
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ message: 'Server error fetching documents' });
  }
};

/**
 * @desc    Delete document
 * @route   DELETE /api/documents/:id
 * @access  Private
 */
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Get document and verify ownership through shipment
    const document = await prisma.document.findFirst({
      where: { id: parseInt(id) },
      include: {
        shipment: true,
      },
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (document.shipment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Delete file from disk
    const filePath = path.join(__dirname, '../..', document.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await prisma.document.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({ message: 'Server error deleting document' });
  }
};

module.exports = {
  upload,
  uploadDocument,
  getDocuments,
  deleteDocument,
};
