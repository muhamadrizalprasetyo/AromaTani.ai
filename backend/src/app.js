require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const authRoutes = require('./routes/auth.routes');
const deviceRoutes = require('./routes/device.routes');
const readingRoutes = require('./routes/readings.routes');
const { initSocket } = require('./services/socket.service');
const { initMqtt } = require('./services/mqtt.service');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/readings', readingRoutes);

// Database connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aromatani';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Initialize Socket.io
    initSocket(server);
    
    // Initialize MQTT Client
    initMqtt();

    server.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
