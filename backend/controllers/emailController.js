const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailController {
  async sendEmail(req, res) {
    let transporter;

    try {
      // Set up the transporter with your SMTP credentials
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Replace with your SMTP host
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "olalalongisipmacapia.capstone@gmail.com",
          pass: "cypj uwdz jtpi xyoj"
        }
      });

      // Extract data from the request body
      const { to, subject, text, html } = req.body;

      // Mail options
      const mailOptions = {
        from: 'This system <olalalongisipmacapia.capstone@gmail.com>', // Replace with your sender address
        to:'ad.lalongisip.45@gmail.com',
        subject:'hello world',
        text:'hi pogi',
        html// HTML body (optional)
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);

      // Respond with success message
      return res.status(200).json({
        status: 200,
        message: 'Email sent successfully',
        messageId: info.messageId
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Failed to send email',
        error: error.message
      });
    } finally {
      if (transporter) {
        transporter.close();
      }
    }
  }
}

module.exports = new EmailController();