
var nodemailer = require('nodemailer');


exports.sendResetMail=(email,OTP)=>{
  

   const transporter = nodemailer.createTransport({
       service : 'gmail',
       auth: {
           user: 'amitshinde110113@gmail.com',
           pass: '8975139966'
       }
       
   });
   const mailOption ={
       from : 'amitshinde110113@gmail.com',
       to: email,
       subject: 'Reset Password',
       text: 'One Time Password is '+OTP
   }
   transporter.sendMail(mailOption , (error, info)=>{
       if(error){
           console.log(error);
       }else{
           console.log('Email sent: ' + info.response);
           res.status(200).json({message:'Email Sent'});
       }
   })
} 