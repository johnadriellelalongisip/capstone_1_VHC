const { Server } = require('socket.io');
const dbModel = require('../models/database_model');
const recordSocket = require('./recordSocket');
const appointmentSocket = require('./appointmentSocket');
const queueSocket = require('./queueSocket');
const staffSocket = require('./staffSocket');
const pharmacySocket = require('./pharmacySocket');
const authenticationSocket = require('./authenticationSocket');
const { socketAuth } = require('../middlewares/socketAuth');

function initializeWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "https://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.use(socketAuth);
  
  recordSocket(io);
  appointmentSocket(io);
  queueSocket(io);
  staffSocket(io);
  pharmacySocket(io);
  authenticationSocket(io);

  return io;
}

module.exports = initializeWebSocket;