const dbModel = require('../models/database_model');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
const saltRounds = 10;
const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;

function hashData(...values) {
  const combinedString = values.map(value => JSON.stringify(value)).join('');
  const hash = crypto.createHash('sha256').update(combinedString).digest('hex');
  return hash;
}

function getDateTime(stateValue = 'fulldatetime') {
  const date = new Date(); 
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  if (stateValue === 'fulldatetime') {
    const data = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
    return data;
  } else if (stateValue === 'date') {
    const data = `${year}-${month}-${day}`;
    return data;
  } else if (stateValue === 'time') {
    const data = `${hour}-${minute}-${seconds}`;
    return data;
  }
}

class StaffController {

  // async sendEmail(req, res) {
  //   try {
  //     const oauth2Client = new OAuth2(
  //       process.env.CLIENT_ID,
  //       process.env.CLIENT_SECRET,
  //       'https://developers.google.com/oauthplayground'
  //     );

  //     oauth2Client.setCredentials({
  //       refresh_token: process.env.REFRESH_TOKEN
  //     });

  //     const accessToken = await oauth2Client.getAccessToken();

  //     const transporter = nodemailer.createTransport({
  //       service: "Gmail",
  //       host: "smtp.gmail.com",
  //       port: 465,
  //       secure: true,
  //       auth: {
  //         type: 'OAuth2',
  //         user: "ayanpohi@gmail.com",
  //         pass: "@Mp3lp0g!022101",
  //         clientId: process.env.CLIENT_ID,
  //         clientSecret: process.env.CLIENT_SECRET,
  //         refreshToken: '1//04nYwfS2U_i37CgYIARAAGAQSNwF-L9Irs-kOQPHuNo59Diu-XZS-M6SPv0h9qc_CJdJceUiMhKt1FAHqkjl0zH5_V61e2TWl_yg',
  //         accessToken: accessToken.token
  //       }
  //     });

  //     const mailOptions = {
  //       from: process.env.EMAIL_USER,
  //       to: 'ayanpohi@gmail.com',
  //       subject: 'Hello from Node.js',
  //       text: 'Hello world!',
  //       html: '<b>Hello world!</b>'
  //     };

  //     const info = await transporter.sendMail(mailOptions);

  //     return res.status(200).json({
  //       status: 200,
  //       messageId: info.messageId,
  //       previewUrl: nodemailer.getTestMessageUrl(info)
  //     });
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     return res.status(500).json({
  //       status: 500,
  //       message: error.message,
  //       error: error
  //     });
  //   }
  // }
  
  async getStaff(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const query = "SELECT `staff_id`, `staff_username`, `staff_email`, `isVerified`, `staff_role`, `account_created_at`, `account_last_updated_at`, `staff_last_activity` FROM `medicalstaff`";
      const response = await dbModel.query(query);
      dbModel.releaseConnection(connection);
      return res.status(200).json({
        status: 200,
        message: 'Data retrieved successfully',
        data: response
      });
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
            const query = 'INSERT INTO medicalstaff (staff_username, staff_password, staff_email, isVerified, staff_role, account_created_at, account_last_updated_at, staff_last_activity, staff_accessibility, staff_history) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const data = [
              payload.username, 
              hash, 
              payload.email,
              0,
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
      const { username, password } = req.body;
  
      if (username !== 'ASDF' || password !== 'admin') {
        return res.status(403).json({ status: 403 });
      }
  
      const user = { staff_username: username };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      const connection = await dbModel.getConnection();
      await dbModel.query('UPDATE `medicalstaff` SET `refresh_token` = ? WHERE `staff_username` = ?', [refreshToken, username]);
      dbModel.releaseConnection(connection);
      return res.json({ accessToken, refreshToken });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    }
  };

  async authToken(req, res) {
    try {
      const { token, staff_username } = req.body;

      const connection = await dbModel.getConnection();
      const user = await dbModel.query('SELECT `staff_username`, `refresh_token` FROM `medicalstaff` WHERE `staff_username` = ?', [staff_username]);
      const refresh_token = user[0]?.refresh_token;
      dbModel.releaseConnection(connection);

      if (refresh_token !== token) return res.sendStatus(403);
      
      if (token !== null || staff_username !== null) {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

          if (err) return res.status(403).json({status: 403, err: err });

          const accessToken = jwt.sign({ staff_username: user.staff_username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });

          res.status(200).json({ accessToken });

        });
      } else {
        return res.status(401);
      }
    } catch (error) {
      return console.log(error);
      // return res.status(500);
    }
  }

  async logoutUser(req, res) {
    try {
      const connection = await dbModel.getConnection();
      const staff_username = req.body.staff_username;
      const removeRefreshTokenQuery = 'UPDATE `medicalstaff` SET `refresh_token` = NULL WHERE `staff_username` = ?';
      const response = await dbModel.query(removeRefreshTokenQuery, staff_username);
      console.log(response);
      dbModel.releaseConnection(connection);
      return res.status(200).json({
        status: 200,
        message: "Logout Successfully"
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
        error: error
      });
    }
  }

  // async authStaff(req, res) {
  //   try {
  //     const connection = await dbModel.getConnection();
  //     const username = req.body.username;
  //     const password = req.body.password;
  //     const userData = await dbModel.query('SELECT staff_id, staff_password, staff_history FROM medicalstaff WHERE staff_username = ?', username);
  //     if (userData.length === 0) {
  //       return res.status(401).json({ status: 401, message: 'No user found.' });
  //       return;
  //     }
  //     const storedHashedPassword = userData[0].staff_password;
  //     const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
  //     if (passwordMatch) {
  //       const currentLogs = JSON.parse(userData[0].staff_history);
  //       const logToAdd = [req.body.logged_in];
  //       const newData = {...currentLogs, [logToAdd]: 'Logged In'};
  //       const updateHistoryResponse = await dbModel.query('UPDATE medicalstaff SET `staff_history` = ? WHERE staff_id = ?', [JSON.stringify(newData), userData[0].staff_id]);
  //       dbModel.releaseConnection(connection);
  //       return res.status(200).json({
  //           status: 200,
  //           message: 'Logged in successfully',
  //           response: updateHistoryResponse,
  //           logs: newData
  //       });
  //     } else {
  //       return res.status(401).json({ status: 401, message: 'Wrong password, retry.' });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({
  //       status: 500,
  //       message: error.message,
  //       error: error
  //     });
  //   }
  // }

}

module.exports = new StaffController();