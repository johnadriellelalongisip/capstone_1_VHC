const jwt = require('jsonwebtoken');
require('dotenv').config();

const routeAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ status: 401, message: "No token."});
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ status: 403, message: "Token invalid!" });
    req.user = user;
    next();
  });
};

module.exports = routeAuth;