const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now, index: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  gasVOC: { type: Number, required: true },
  gasEthanol: { type: Number, required: true },
  aiStatus: { type: String, required: true }, // e.g., AMAN, WASPADA, BAHAYA
  confidence: { type: Number, required: true },
  fanActive: { type: Boolean, default: false },
});

module.exports = mongoose.model('Reading', readingSchema);
