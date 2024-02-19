const dbModel = require('../models/database_model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class StaffController {

  //  ADD USERNAME AND EMAIL CHECKING IF IT ALREADY EXISTS IN THE DATABASE
  
  async addStaff(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const query = 'INSERT INTO medicalstaff (staff_username, staff_password, staff_email, staff_role, account_created_at, account_last_updated_at, staff_last_activity, staff_history) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const staff = req.body;
      bcrypt.hash(staff.password, saltRounds, async function(err, hash) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          try {
            const response = await dbModel.query(query, [staff.username, hash, staff.email, 'USER', staff.current_datetime, staff.current_datetime, staff.current_datetime, staff.history]);
            dbModel.releaseConnection(connection);
            res.status(200).json({ 
              status: 200,
              message: 'User added successfully',
              response: response
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              status: 500,
              message: 'Something have gone wrong',
              error_message: error
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, message: `Internal Server Error`, error: error });
    }
  };

  async authStaff(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const username = req.body.username;
      const password = req.body.password;
      const userData = await dbModel.query('SELECT staff_id, staff_password, staff_history FROM medicalstaff WHERE staff_username = ?', username);
      if (userData.length === 0) {
        res.status(401).json({ status: 401, message: 'Invalid credentials' });
        return;
      }
      const storedHashedPassword = userData[0].staff_password;
      const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
      if (passwordMatch) {
        const currentLogs = JSON.parse(userData[0].staff_history);
        const logToAdd = [req.body.logged_in];
        const newData = {...currentLogs, [logToAdd]: 'Logged In'};
        const updateHistoryResponse = await dbModel.query('UPDATE medicalstaff SET `staff_history` = ? WHERE staff_id = ?', [JSON.stringify(newData), userData[0].staff_id]);
    
        res.status(200).json({
            status: 200,
            message: 'Logged in successfully',
            response: updateHistoryResponse,
            logs: newData
        });
    } else {
        res.status(401).json({ status: 401, message: 'Invalid credentials' });
      }
      dbModel.releaseConnection(connection);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Internal Server Error', error: error });
    }
  }

}

module.exports = new StaffController();