const express = require('express');
const { protect } = require('../middleware/auth');
const Scan = require('../models/Scan');

const router = express.Router();

// Search documents
router.get('/search', protect, async (req, res) => {
  try {
    const { q } = req.query;
    const scans = await Scan.find({
      userId: req.user._id,
      $text: { $search: q },
    });
    res.json({ success: true, data: scans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export document
router.get('/:id/export', protect, async (req, res) => {
  try {
    const scan = await Scan.findOne({ _id: req.params.id, userId: req.user._id });
    if (!scan) return res.status(404).json({ message: 'Not found' });

    res.json({
      documentType: scan.documentType,
      extractedData: scan.fields,
      rawText: scan.rawText,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
