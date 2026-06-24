const express = require('express');
const Device = require('../models/Device.model');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const device = new Device(req.body);
    await device.save();
    res.status(201).json(device);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
