// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

// Login route: case-sensitive lookup of username and password
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // The query below will use the exact username provided.
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const payload = { id: user.id, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ accessToken, refreshToken });
});

// Signup route: validates that a role is provided and includes email in registration
router.post('/signup', async (req, res) => {
  try {
    const { username, password, role, email } = req.body;
    // Ensure role is provided for registration
    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }
    // Create a new user; ensure the beforeCreate hook hashes the password.
    const newUser = await User.create({ username, password, role, email });
    const payload = { id: newUser.id, role: newUser.role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
