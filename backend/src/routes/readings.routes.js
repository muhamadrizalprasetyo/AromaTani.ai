const express = require('express');
const Reading = require('../models/Reading.model');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/:deviceId', auth, async (req, res) => {
  try {
    const readings = await Reading.find({ deviceId: req.params.deviceId })
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(readings.reverse());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
