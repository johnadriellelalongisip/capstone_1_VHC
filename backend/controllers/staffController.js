const dbModel = require('../models/database_model');
// const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
const saltRounds = 10;
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;

// function hashData(...values) {
//   const combinedString = values.map(value => JSON.stringify(value)).join('');
//   const hash = crypto.createHash('sha256').update(combinedString).digest('hex');
//   return hash;
// }

// function getDateTime(stateValue = 'fulldatetime') {
//   const date = new Date(); 
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const day = date.getDate().toString().padStart(2, '0');
//   const hour = date.getHours().toString().padStart(2, '0');
//   const minute = date.getMinutes().toString().padStart(2, '0');
//   const seconds = date.getSeconds().toString().padStart(2, '0');
//   if (stateValue === 'fulldatetime') {
//     const data = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
//     return data;
//   } else if (stateValue === 'date') {
//     const data = `${year}-${month}-${day}`;
//     return data;
//   } else if (stateValue === 'time') {
//     const data = `${hour}-${minute}-${seconds}`;
//     return data;
//   }
// }

class StaffController {

  // async sendEmail(req, res) {
  // let connection;
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
    let connection;
    try {
      connection = await dbModel.getConnection();
      const query = "SELECT `staff_id`, `staff_username`, `staff_email`, `isVerified`, `staff_role`, `account_created_at`, `account_last_updated_at`, `staff_last_activity` FROM `medicalstaff`";
      const response = await dbModel.query(query);
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
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }
  
  async addStaff(req, res) {
    let connection;
    try {
      connection = await dbModel.getConnection();
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
              "dashboard": {
                "create": false,
                "retrieve": true,
                "update": false,
                "delete": false
              },
              "analytics": {
                "create": false,
                "retrieve": true,
                "update": false,
                "delete": false
              },
              "mapping": {
                "create": false,
                "retrieve": true,
                "update": false,
                "delete": false
              },
              "appointments": {
                "create": false,
                "retrieve": true,
                "update": false,
                "delete": false
              },
              "queue": {
                "create": false,
                "retrieve": true,
                "update": false,
                "delete": false
              },
              "records": {
                "create": false,
                "retrieve": true,
                "update": false,
                "delete": false
              },
              "pharmacy": {
                "create": false,
                "retrieve": true,
                "update": false,
                "delete": false
              },
              "blood": {
                "create": false,
                "retrieve": true,
                "update": false,
                "delete": false
              },
              "equipment": {
                "create": false,
                "retrieve": true,
                "update": false,
                "delete": false
              },
              "accounts": {
                "create": false,
                "retrieve": true,
                "update": false,
                "delete": false
              },
              "blood_unit": {
                "create": false,
                "retrieve": true,
                "update": false,
                "delete": false
              },
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
  };

  async logoutUser(req, res) {
    let connection;
    if (req.body.staff_username && req.body.staff_username === process.env.DEVELOPER_USERNAME) {
      return res.status(200).json({
        status: 200,
        message: "Logout Successfully"
      });
    }
    try {
      connection = await dbModel.getConnection();
      const userQuery = 'SELECT `staff_history`, `refresh_token` FROM `medicalstaff` WHERE `staff_username` = ?';
      const staff_username = req.body.staff_username;
      const [user] = await dbModel.query(userQuery, [staff_username]);
      const newHistory = {
        ...JSON.parse(user.staff_history),
        ...req.body.history
      };
      const refreshTokens = JSON.parse(user.refresh_token);
      if (refreshTokens.hasOwnProperty(req.body.deviceId)) {
        delete refreshTokens[req.body.deviceId];
      };
      console.log(refreshTokens);
      const removeRefreshTokenQuery = 'UPDATE `medicalstaff` SET `refresh_token` = ?, `staff_history` = ? WHERE `staff_username` = ?';
      await dbModel.query(removeRefreshTokenQuery, [JSON.stringify(refreshTokens), JSON.stringify(newHistory), staff_username]);
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
    } finally {
      if (connection) {
        dbModel.releaseConnection(connection);
      }
    }
  }

}

module.exports = new StaffController();