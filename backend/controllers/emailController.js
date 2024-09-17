const express = require("express");
const app = express();
const nodemailer =require("nodemailer");
require("dotenv").config();
const path = require("path");
const csrf = require("csurf");
const csurfProtection = csrf(); 
app.use(csurfProtection);
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service:'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "olalalongisipmacapia.capstone@gmail.com",
    pass: "phxv xvoi tbmj bmwc",
  },
  
});
app.post("/email", (req, res) => {
  const mailOptions = {
    from: '"olalalongisipmacapia.capstone@gmail.com"',
    to: "ad.lalongisip.45@gmail.com, ad.lalongisip.45@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
    attachment: {
      filename: "Bold.pdf",
      path: path.join(__dirname, "Bold.pdf"),
      contentType: "application/pdf",
    },
  };
  mailOptions.csrf = req.csrfToken();

  sendMail(transporter, mailOptions)
    .then(() => {
      console.log("Email sent successfully!");
      res.send("Email sent successfully!");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    });
});

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } 
  catch (error) {
    console.error(error);
    throw error;
  }
}