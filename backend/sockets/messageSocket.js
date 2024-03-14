const { Server } = require('socket.io');

function initializeMessageSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "https://localhost:3000",
      methods: ["GET","POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("newData", (data) => {
      socket.emit("data", data);
    })
  });

  return io;
}

module.exports = initializeMessageSocket;