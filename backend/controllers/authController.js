const jwt = require('jsonwebtoken');
const dbModel = require('../models/database_model');
const bcrypt = require('bcryptjs');
require('dotenv').config();

class AuthController {
  
  async authStaff(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
      const developer = {
        username: process.env.DEVELOPER_USERNAME,
        password: process.env.DEVELOPER_PASSWORD
      };
  
      const { username, password, dateTime } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ status: 400, message: 'Username and password are required' });
      }
  
      if (username === developer.username && password === developer.password) {
        const user = { username: developer.username, role: "developer" };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        return res.status(200).json({ accessToken, refreshToken, message: "Welcome back Mr. Developer!" });
      }
  
      const userQuery = "SELECT `staff_id`, `username`, `password`, `role` FROM `medicalstaff` WHERE `username` = ?";
      const [staff] = await dbModel.query(userQuery, [username]);
  
      if (!staff) {
        return res.status(401).json({ status: 401, message: 'No user found.' });
      }
  
      const passwordMatched = await bcrypt.compare(password, staff.password);
      if (!passwordMatched) {
        return res.status(401).json({ status: 401, message: "Incorrect password!" });
      }
  
      const generateToken = (secret, expiresIn) => {
        const role = staff.role;
        const username = staff.username;
        const data = { username, role}
        return jwt.sign( data, secret, { expiresIn } );
      };
      const refreshToken = generateToken(process.env.REFRESH_TOKEN_SECRET, '7d');
      const accessToken = generateToken(process.env.ACCESS_TOKEN_SECRET, '2m');
  
      const updateRefreshTokenQuery = "UPDATE `medicalstaff` SET `refresh_token` = ? WHERE `staff_id` = ?";
      const createStaffHistoryQuery = "INSERT INTO `medicalstaff_history` (`staff_id`, `action`, `action_details`, `citizen_family_id`, `action_datetime`) VALUES (?, ?, ?, ?, ?)";
      const staffHistoryValues = [staff.staff_id, 'logged in', 'logged in', null, dateTime];
  
      await dbModel.query(updateRefreshTokenQuery, [refreshToken, staff.staff_id]);
      await dbModel.query(createStaffHistoryQuery, staffHistoryValues);
      
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
      });
      return res.status(200).json({ status: 200, accessToken, message: "Login Successful!" });

    } catch (error) {
      return res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }  

  async authToken(req, res) {
    let connection;
    try {
      console.log('token requested')
      const refreshToken = req.cookies.refreshToken;
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing or malformed' });
      }
      const token = authHeader.split(' ')[1];
      console.log(token)
      if (username === process.env.DEVELOPER_USERNAME) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
          if (err) return res.status(403).json({ status: 403, err });
          const accessToken = jwt.sign({ username: decoded.username, role: decoded.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
          return res.status(200).json({ accessToken });
        });
      }
      console.log('verifying refreshtoken')
      const [user] = await dbModel.query('SELECT `refresh_token` FROM `medicalstaff` WHERE `username` = ?', [username]);
      if (refreshToken !== user.refreshToken) {
        console.log("not equal")
        return res.status(401).json({ status: 401, message: "Unauthorized or malformed token!" });
      }
      console.log("verifying refresh token with env")
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ status: 403, err });
        const accessToken = jwt.sign({ username: decoded.username, role: decoded.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
        console.log(accessToken)
        return res.status(200).json({ accessToken: accessToken });
      });
      
    } catch (error) {
      return res.status(500);
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }
  
}

module.exports = new AuthController();
