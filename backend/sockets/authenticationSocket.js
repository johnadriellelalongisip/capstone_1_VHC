module.exports = function(io) {

  io.on('connection', (socket) => {

    socket.on('newMessage', (message) => {
      socket.broadcast.emit('message', `${message}`);
    });

  });
}