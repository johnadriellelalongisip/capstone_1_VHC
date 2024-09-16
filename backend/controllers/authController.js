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
  
      const userQuery = "SELECT `staff_id`, `username`, `password`, `role`, `isVerified` FROM `medicalstaff` WHERE `username` = ?";
      const [staff] = await dbModel.query(userQuery, [username]);
  
      if (!staff) {
        return res.status(401).json({ status: 401, message: 'No user found.' });
      }
  
      const passwordMatched = await bcrypt.compare(password, staff.password);
      if (!passwordMatched) {
        return res.status(401).json({ status: 401, message: "Incorrect password!" });
      }

      const isVerified = Boolean(staff.isVerified);
      if (!isVerified) return res.status(401).json({ status: 401, message: "Email unverified! Verify first on your email." });

      const generateToken = (secret, expiresIn) => {
        const role = staff.role;
        const username = staff.username;
        const data = { username, role}
        return jwt.sign( data, secret, { expiresIn } );
      };
      const refreshToken = generateToken(process.env.REFRESH_TOKEN_SECRET, '7d');
      const accessToken = generateToken(process.env.ACCESS_TOKEN_SECRET, '5m');
  
      const updateRefreshTokenQuery = "UPDATE `medicalstaff` SET `refresh_token` = ? WHERE `staff_id` = ?";
      const createStaffHistoryQuery = "INSERT INTO `medicalstaff_history` (`staff_id`, `action`, `action_details`, `citizen_family_id`, `action_datetime`) VALUES (?, ?, ?, ?, ?)";
      const staffHistoryValues = [staff.staff_id, 'logged in', 'logged in', null, dateTime];
  
      await dbModel.query(updateRefreshTokenQuery, [refreshToken, staff.staff_id]);
      await dbModel.query(createStaffHistoryQuery, staffHistoryValues);
      
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // persistent cookie with expiration
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
      const refreshToken = req.cookies.refreshToken;
      const authHeader = req.headers['authorization'];
      const username = req.body.username;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing or malformed' });
      }
      const accessToken = authHeader.split(' ')[1]; 

      if (username === process.env.DEVELOPER_USERNAME) {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
          if (err) return res.status(403).json({ status: 403, err });
          const accessToken = jwt.sign(
            { username: decoded.username, role: decoded.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
          );
          return res.status(200).json({ accessToken });
        });
        return;
      }

      const [user] = await dbModel.query('SELECT `refresh_token` FROM `medicalstaff` WHERE `username` = ?', [username]);
      if (!user || refreshToken !== user.refresh_token) {
        return res.status(401).json({ status: 401, message: "Unauthorized or malformed token!" });
      }
  
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
          return res.status(403).json({ status: 403, err });
        }
        const newAccessToken = jwt.sign(
          { username: decoded.username, role: decoded.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '5m' }
        );
        return res.status(200).json({ accessToken: newAccessToken });
      });
  
    } catch (error) {
      return res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

  async refreshRefreshToken(req, res) {
    let connection;
    try {
      const username = req.body.username;
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing' });
      }

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
          const message = err.message;
          switch (err.name) {
            case 'TokenExpiredError':
              return res.status(401).json({ error: 'Refresh token expired', expiredAt: err.expiredAt });
            case 'JsonWebTokenError':
            case 'NotBeforeError':
              return res.status(401).json({ error: message });
            default:
              return res.status(400).json({ error: 'Invalid refresh token' });
          }
        }

        const userQuery = "SELECT `username`, `role` FROM `medicalstaff` WHERE `username` = ?";
        const [user] = await dbModel.query(userQuery, [username]);
        if (!user) {
          return res.status(404).json({ status: 404, message: "User not found!" });
        }

        const newRefreshToken = jwt.sign(
          { username: user.username, role: user.role },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '7d' }
        );

        const updateUserTokenQuery = "UPDATE `medicalstaff` SET `refresh_token` = ? WHERE `username` = ?";
        const updateUserTokenResponse = await dbModel.query(updateUserTokenQuery, [newRefreshToken, username]);
        if (updateUserTokenResponse.affectedRows === 0) {
          return res.status(409).json({ status: 409, message: "Failed to update the refresh token!" });
        }

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict'
        });

        return res.status(200).json({ message: 'Refresh token updated successfully' });
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }
  
}

module.exports = new AuthController();
