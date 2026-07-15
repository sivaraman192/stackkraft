const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const { uploadImage, deleteImage } = require('../config/cloudinary');

// Multer memory storage configuration (holds file buffers in memory for Cloudinary upload streams)
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// @route   POST /api/upload/single
// @desc    Upload a single image to Cloudinary
// @access  Private (Admin only)
router.post('/single', [auth, upload.single('image')], async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded' });
  }

  try {
    const folder = req.body.folder || 'stackkraft/portfolio';
    const result = await uploadImage(req.file.buffer, folder);
    res.status(200).json(result);
  } catch (err) {
    console.error("Cloudinary single upload error:", err);
    res.status(500).json({ message: 'Failed to upload image', error: err.message });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple images to Cloudinary
// @access  Private (Admin only)
router.post('/multiple', [auth, upload.array('images', 10)], async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No image files uploaded' });
  }

  try {
    const folder = req.body.folder || 'stackkraft/portfolio';
    const uploadPromises = req.files.map(file => uploadImage(file.buffer, folder));
    const results = await Promise.all(uploadPromises);
    res.status(200).json(results);
  } catch (err) {
    console.error("Cloudinary multiple upload error:", err);
    res.status(500).json({ message: 'Failed to upload one or more images', error: err.message });
  }
});

// @route   DELETE /api/upload
// @desc    Delete an image from Cloudinary by public ID
// @access  Private (Admin only)
router.delete('/', auth, async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) {
    return res.status(400).json({ message: 'Public ID is required' });
  }

  try {
    const result = await deleteImage(publicId);
    res.status(200).json({ message: 'Image deleted successfully', result });
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    res.status(500).json({ message: 'Failed to delete image', error: err.message });
  }
});

module.exports = router;
