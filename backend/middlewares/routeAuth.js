const jwt = require('jsonwebtoken');
require('dotenv').config();

const routeAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  if (!accessToken) {
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Strict', secure: true });
    return res.status(401).json({ message: "Access token is missing" });
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ status: 403, message: "Token invalid!" });
    next();
  });
};

module.exports = routeAuth;