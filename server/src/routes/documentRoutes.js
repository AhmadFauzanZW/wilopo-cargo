const express = require('express');
const {
  upload,
  uploadDocument,
  getDocuments,
  deleteDocument,
} = require('../controllers/documentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

router
  .route('/shipments/:id/documents')
  .get(getDocuments)
  .post(upload.single('file'), uploadDocument);

router.route('/documents/:id').delete(deleteDocument);

module.exports = router;
