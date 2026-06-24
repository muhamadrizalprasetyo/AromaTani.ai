const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: '*', // For development
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Join device specific room
    socket.on('subscribe', (deviceId) => {
      socket.join(deviceId);
      console.log(`Socket ${socket.id} subscribed to ${deviceId}`);
    });

    socket.on('unsubscribe', (deviceId) => {
      socket.leave(deviceId);
      console.log(`Socket ${socket.id} unsubscribed from ${deviceId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { initSocket, getIo };
