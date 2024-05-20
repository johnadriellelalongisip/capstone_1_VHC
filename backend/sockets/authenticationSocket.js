module.exports = function(io) {

  io.on('connection', (socket) => {

    socket.on('newMessage', (message) => {
      socket.emit('message', `Echo: ${message}`);
      socket.broadcast.emit('message', `Broadcast from ${socket.user.staff_username}: ${message}`);
    });

  });
}