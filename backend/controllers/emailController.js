const nodemailer =require("nodemailer");
require("dotenv").config();
const path = require("path");
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
const mailOptions={
    from: '"olalalongisipmacapia.capstone@gmail.com"', // sender address
    adress: "olalalongisipmacapia.capstone@gmail.com",
    to: "ad.lalongisip.45@gmail.com, ad.lalongisip.45@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachment:
    {
      filename: 'Bold.pdf',
      path: path.join(__dirname,'Bold.pdf'),
      contentType:'application/pdf'
      
  
  }
}
const sendMail =async(transporter,mailOptions)=>{
  try{
    await transporter.sendMail(mailOptions);
    console.log('email has been sent successfully!!!');
  }catch(error){
    console.error(error);
  }
}
sendMail(transporter,mailOptions);