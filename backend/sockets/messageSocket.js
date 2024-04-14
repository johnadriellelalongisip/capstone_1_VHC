const { Server } = require('socket.io');

function initializeMessageSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "https://localhost:3000",
      methods: ["GET","POST"],
    },
  });

  io.on("connection", (socket) => {

    console.log("A Client ID:",socket.id);
    
    socket.on("newData", (data) => {      
      if (data) {
        console.log(data);
      }
      socket.emit("data", data);
    })
  });
  return io;
}

module.exports = initializeMessageSocket;