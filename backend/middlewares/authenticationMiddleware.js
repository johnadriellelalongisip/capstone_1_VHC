const jwt = require('jsonwebtoken');

module.exports.authenticationMiddleware = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Error! No token.'));
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next(new Error(`Authentication error ${err}`));
    socket.user = user;
    next();
  });
};