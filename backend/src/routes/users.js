const express = require('express');
const { protect } = require('../middleware/auth');
const Scan = require('../models/Scan');

const router = express.Router();

// Get user stats
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = await Scan.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$documentType', count: { $sum: 1 } } },
    ]);
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
