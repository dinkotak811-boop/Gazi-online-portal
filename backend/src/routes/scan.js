const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { protect } = require('../middleware/auth');
const Scan = require('../models/Scan');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname)),
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Upload and scan
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    // Mock OCR for now
    const scan = await Scan.create({
      userId: req.user._id,
      documentType: 'Aadhaar',
      rawText: 'Sample text from image',
      fields: [
        { label: 'Name', value: 'Rahul Kumar', confidence: 95 },
        { label: 'Aadhaar', value: '1234 5678 9012', confidence: 98 },
      ],
      imageUrl: `/uploads/${req.file.filename}`,
      confidence: 96,
    });

    res.json({ success: true, data: scan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's scans
router.get('/', protect, async (req, res) => {
  try {
    const scans = await Scan.find({ userId: req.user._id, isDeleted: false }).sort({ createdAt: -1 });
    res.json({ success: true, data: scans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
