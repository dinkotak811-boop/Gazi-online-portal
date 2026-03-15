const express = require('express');
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const Scan = require('../models/Scan');

const router = express.Router();

router.use(protect, admin);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all scans
router.get('/scans', async (req, res) => {
  try {
    const scans = await Scan.find().populate('userId', 'name email');
    res.json({ success: true, data: scans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
