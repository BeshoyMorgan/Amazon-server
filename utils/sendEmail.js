const nodemailer = require('nodemailer');


const sendEmail = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });



   transporter.sendMail(mailOptions,(err, info)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(info);
        }
  });
};

module.exports = sendEmail;
