const dbModel = require('../models/database_model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class StaffController {

  //  ADD USERNAME AND EMAIL CHECKING IF IT ALREADY EXISTS IN THE DATABASE

  async getStaff(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const query = "SELECT `staff_id`, `staff_username`, `staff_email`, `staff_role`, `account_created_at`, `account_last_updated_at`, `staff_last_activity` FROM `medicalstaff`";
      const response = await dbModel.query(query);
      dbModel.releaseConnection(connection);
      return res.status(200).json({
        status: 200,
        message: 'Data retrieved successfully',
        data: response
      });
      dbModel.releaseConnection(connection);
    } catch (error) {
      console.error('Error retrieving staff:', error);
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    }
  }
  
  async addStaff(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const payload = req.body;
      const retrieveQuery = "SELECT `staff_username` FROM `medicalstaff` WHERE `staff_username` = ?";
      const emailRetrieveQuery = "SELECT `staff_username` FROM `medicalstaff` WHERE `staff_email`= ?"
      const retrieveResponse = await dbModel.query(retrieveQuery, payload.username);
      const retrieveEmailResponse = await dbModel.query(emailRetrieveQuery, payload.email);
      if (retrieveResponse.length !== 0) {
        return res.status(403).json({
          status: 403,
          message: "Username already exists!"
        });
      }
      if (retrieveEmailResponse.length !== 0) {
        return res.status(403).json({
          status: 403,
          message: "Email already exists!"
        });
      }
      bcrypt.hash(payload.password, saltRounds, async function(err, hash) {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        } else {
          try {
            const accessibility = {
              "accessibility": {
                "dashboard": {
                  "view": true,
                  "edit": false
                },
                "users": {
                  "view": true,
                  "edit": false,
                  "create": false,
                  "delete": false
                },
                "accounts": {
                  "view": true,
                  "edit": false,
                  "create": false,
                  "delete": false
                },
                "appointments": {
                  "view": true,
                  "edit": false,
                  "create": false,
                  "delete": false
                },
                "home": {
                  "view": true,
                  "edit": false
                },
                "queue": {
                  "view": true,
                  "edit": false
                },
                "analytics": {
                  "view": true,
                  "edit": false
                },
                "records": {
                  "view": true,
                  "edit": false,
                  "create": false,
                  "delete": false
                },
                "pharmacy": {
                  "view": true,
                  "edit": false,
                  "create": false,
                  "delete": false
                },
                "blood_unit": {
                  "view": true,
                  "edit": false,
                  "create": false,
                  "delete": false
                },
                "mapping": {
                  "view": true,
                  "edit": false
                },
                "notfound": {
                  "view": true
                }
              }
            };
            const query = 'INSERT INTO medicalstaff (staff_username, staff_password, staff_email, staff_role, account_created_at, account_last_updated_at, staff_last_activity, staff_accessibility, staff_history) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const data = [
              payload.username, 
              hash, 
              payload.email, 
              payload.role, 
              payload.current_datetime, 
              payload.current_datetime, 
              payload.current_datetime, 
              JSON.stringify(accessibility), 
              JSON.stringify(payload.history)
            ];
            const response = await dbModel.query(query, data);
            return res.status(200).json({ 
              status: 200,
              message: 'User added successfully',
              response : response
            });
          } catch (error) {
            return res.status(500).json({
              status: 500,
              message: 'Oops! Something have gone wrong',
              error_message: error
            });
          }
        }
      });
      dbModel.releaseConnection(connection);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    }
  };

  async authStaff(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const username = req.body.username;
      const password = req.body.password;
      const userData = await dbModel.query('SELECT staff_id, staff_password, staff_history FROM medicalstaff WHERE staff_username = ?', username);
      if (userData.length === 0) {
        return res.status(401).json({ status: 401, message: 'No user found.' });
        return;
      }
      const storedHashedPassword = userData[0].staff_password;
      const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
      if (passwordMatch) {
        const currentLogs = JSON.parse(userData[0].staff_history);
        const logToAdd = [req.body.logged_in];
        const newData = {...currentLogs, [logToAdd]: 'Logged In'};
        const updateHistoryResponse = await dbModel.query('UPDATE medicalstaff SET `staff_history` = ? WHERE staff_id = ?', [JSON.stringify(newData), userData[0].staff_id]);
        dbModel.releaseConnection(connection);
        return res.status(200).json({
            status: 200,
            message: 'Logged in successfully',
            response: updateHistoryResponse,
            logs: newData
        });
      } else {
        return res.status(401).json({ status: 401, message: 'Wrong password, retry.' });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    }
  }

}

module.exports = new StaffController();