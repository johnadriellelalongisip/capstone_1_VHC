const jwt = require('jsonwebtoken');
const dbModel = require('../models/database_model');
const bcrypt = require('bcryptjs');
require('dotenv').config();

class AuthController {
  async authStaff(req, res) {
    const connection = await dbModel.getConnection();
    try {
      const { username, password, history, deviceId, dateTime } = req.body;

      if (!username || !password) {
        return res.status(400).json({ status: 400, message: 'Username and password are required' });
      }

      const [staff] = await dbModel.query('SELECT `staff_username`, `staff_password`, `staff_role`, `staff_history`, `staff_devices` FROM `medicalstaff` WHERE `staff_username` = ?', [username]);

      if (!staff) {
        return res.status(401).json({ status: 401, message: 'No user found.' });
      }

      const passwordMatch = await bcrypt.compare(password, staff.staff_password);
      if (!passwordMatch) return res.status(401).json({ status: 401, message: "Wrong password" });

      const user = { staff_username: username, role: staff.staff_role };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

      const newHistory = { ...JSON.parse(staff.staff_history), ...history };
      const devices = { ...JSON.parse(staff.staff_devices), [String(dateTime)]: deviceId };
      const dataToQuery = [refreshToken, String(dateTime), JSON.stringify(newHistory), JSON.stringify(devices), username];
      await dbModel.query('UPDATE `medicalstaff` SET `refresh_token` = ?, `staff_last_activity` = ?, `staff_history` = ?, `staff_devices` = ? WHERE `staff_username` = ?', dataToQuery);

      res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
      return res.status(200).json({ accessToken, refreshToken });

    } catch (error) {
      return res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
    } finally {
      dbModel.releaseConnection(connection);
    }
  }

  async authToken(req, res) {
    try {
      const { token, staff_username } = req.body;

      const [user] = await dbModel.query('SELECT `refresh_token` FROM `medicalstaff` WHERE `staff_username` = ?', [staff_username]);

      if (user.refresh_token !== token) return res.status(403).json({ status: 403, message: 'Token did not match!' });

      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ status: 403, err });

        const accessToken = jwt.sign({ staff_username: decoded.staff_username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });

        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        return res.status(200).json({ accessToken });
      });

    } catch (error) {
      return res.status(500).json({ status: 500, message: "Error occurred", error });
    }
  }
}

module.exports = new AuthController();
