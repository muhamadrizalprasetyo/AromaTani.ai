const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // will be hashed
  role: { type: String, enum: ['admin', 'viewer'], default: 'admin' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
