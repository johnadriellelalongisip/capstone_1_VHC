const jwt = require('jsonwebtoken');
const dbModel = require('../models/database_model');
const bcrypt = require('bcryptjs');
require('dotenv').config();

class AuthController {
  async authStaff(req, res) {
    let connection;
    connection = await dbModel.getConnection();
    const developer = {
      username: process.env.DEVELOPER_USERNAME,
      password: process.env.DEVELOPER_PASSWORD
    };
    try {
      const { username, password, history, deviceId, dateTime, ipAddress } = req.body;
      if (!username || !password) {
        return res.status(400).json({ status: 400, message: 'Username and password are required' });
      }
      if (username === developer.username && password === developer.password) {
        const user = { staff_username: developer.username, role: "developer", accessibility: "full" };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        // res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'None' });
        // res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None' });
        return res.status(200).json({ accessToken, refreshToken });
      }
      const [staff] = await dbModel.query('SELECT `staff_username`, `staff_password`, `refresh_token`, `staff_role`, `staff_accessibility`, `staff_history`, `staff_devices` FROM `medicalstaff` WHERE `staff_username` = ?', [username]);

      if (!staff) {
        return res.status(401).json({ status: 401, message: 'No user found.' });
      }

      const passwordMatch = await bcrypt.compare(password, staff.staff_password);
      if (!passwordMatch) return res.status(401).json({ status: 401, message: "Wrong password" });

      const user = { staff_username: username, role: staff.staff_role };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      const tokens = JSON.parse(staff.refresh_token);
      const devicesRT = tokens 
        ? { ...tokens, [deviceId]: refreshToken }
        : { [deviceId]: refreshToken };
      const newHistory = { ...JSON.parse(staff.staff_history), ...history };
      const devices = { ...JSON.parse(staff.staff_devices), [String(deviceId) + "," + String(ipAddress)]: String(dateTime) };
      const dataToQuery = [(JSON.stringify(devicesRT)), String(dateTime), JSON.stringify(newHistory), JSON.stringify(devices), username];
      await dbModel.query('UPDATE `medicalstaff` SET `refresh_token` = ?, `staff_last_activity` = ?, `staff_history` = ?, `staff_devices` = ? WHERE `staff_username` = ?', dataToQuery);
      // res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'None' });
      // res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None' });
      return res.status(200).json({ accessToken, refreshToken, message: "Login successful", accessibilities: staff.staff_accessibility });
    } catch (error) {
      return res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
    } finally {
      dbModel.releaseConnection(connection);
    }
  }

  async authToken(req, res) {
    let connection;
    try {
      const { token, staff_username, deviceId } = req.body;
      if (staff_username === process.env.DEVELOPER_USERNAME) {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
          if (err) return res.status(403).json({ status: 403, err });
  
          const accessToken = jwt.sign({ staff_username: decoded.staff_username, role: decoded.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });

          return res.status(200).json({ accessToken });
        });
      } else {
        const [user] = await dbModel.query('SELECT `refresh_token` FROM `medicalstaff` WHERE `staff_username` = ?', [staff_username]);
        const tokens = JSON.parse(user.refresh_token);
        if (tokens.hasOwnProperty(deviceId) || Object.values(tokens).includes(token)) {
          jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ status: 403, err });
    
            const accessToken = jwt.sign({ staff_username: decoded.staff_username, role: decoded.role, accessibility: decoded.staff_accessibility }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });
  
            return res.status(200).json({ accessToken });
          });
        } else {
          if (JSON.parse(user.refresh_token)[String(deviceId)] !== token) return res.status(403).json({ status: 403, message: 'Token did not match!' });
    
          jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ status: 403, err });
    
            const accessToken = jwt.sign({ staff_username: decoded.staff_username, role: decoded.role, accessibility: decoded.staff_accessibility }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });
  
            return res.status(200).json({ accessToken });
          });
        }

      }
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
