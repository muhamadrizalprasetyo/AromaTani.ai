const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const router = express.Router();

// Mock initial admin creation if not exists
router.post('/init', async (req, res) => {
  const existingAdmin = await User.findOne({ username: 'admin' });
  if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('demo', salt);

  const admin = new User({
    username: 'admin',
    password: hashedPassword,
    role: 'admin'
  });

  await admin.save();
  res.status(201).json({ message: 'Admin user created (username: admin, password: demo)' });
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Default demo bypass if DB not seeded
    if (username === 'admin' && password === 'demo') {
      const token = jwt.sign({ username: 'admin', role: 'admin' }, process.env.JWT_SECRET || 'aromatani_super_secret_key_2025', { expiresIn: '1d' });
      return res.json({ token, user: { username: 'admin', role: 'admin' } });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || 'aromatani_super_secret_key_2025', { expiresIn: '1d' });
    res.json({ token, user: { username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
