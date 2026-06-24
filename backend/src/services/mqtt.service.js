const mqtt = require('mqtt');
const Reading = require('../models/Reading.model');
const { getIo } = require('./socket.service');

const initMqtt = () => {
  const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://127.0.0.1:1883';
  const client = mqtt.connect(brokerUrl);

  client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    client.subscribe('aromatani/+/sensor', (err) => {
      if (!err) {
        console.log('Subscribed to aromatani/+/sensor');
      } else {
        console.error('MQTT Subscription Error:', err);
      }
    });
  });

  client.on('message', async (topic, message) => {
    try {
      // topic format: aromatani/deviceId/sensor
      const parts = topic.split('/');
      if (parts.length === 3 && parts[2] === 'sensor') {
        const deviceId = parts[1];
        const data = JSON.parse(message.toString());
        
        // Expected data: { temperature, humidity, gasVOC, gasEthanol, aiStatus, confidence, fanActive }
        const reading = new Reading({
          deviceId,
          ...data
        });
        
        await reading.save();

        // Broadcast to clients listening to this deviceId
        try {
          const io = getIo();
          io.to(deviceId).emit('sensor_data', reading);
          // Also broadcast to a general feed if needed
          io.emit('all_sensor_data', reading);
        } catch (ioErr) {
          console.error('Socket broadcast error:', ioErr);
        }
      }
    } catch (err) {
      console.error('MQTT message parsing/saving error:', err);
    }
  });

  return client;
};

module.exports = { initMqtt };
