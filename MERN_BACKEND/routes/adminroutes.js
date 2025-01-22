// routes/adminroutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const AdminData = require('../models/admindata');
const router = express.Router();

// Admin login - no password hashing, just plain-text comparison
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await AdminData.findOne({ username });

    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    // Compare plain-text password
    if (admin.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id, role: admin.role }, process.env.JWT_SECRET || 'abcdefg', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;
