
var nodemailer = require('nodemailer');


exports.sendResetMail=(email,OTP)=>{
  

//    const transporter = nodemailer.createTransport({
//        service : 'gmail',
//        auth: {
//            user: 'amitshinde110113@gmail.com',
//            pass: '8975139966'
//        }
       
//    });

   const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'amitshinde110113@gmail.com',
        pass: 'ddeixfmetyhtchxn'
    },
    debug: true, // show debug output
    logger: true // log information in console
  });
   const mailOption ={
       from : 'amitshinde110113@gmail.com',
       to: email,
       subject: 'Reset Password',
       text: 'One Time Password is '+OTP
   }
 return  transport.sendMail(mailOption);
//   , (error, info));
//  =>{
//        if(error){
//            console.log(error); 
//        return error;
//             // res.status(500)
//        }else{
//            console.log('Email sent: ' + info.response);
//            return info.response;      
//            //  res.status(200).json({otp:OTP,email:email});

//        }
//    })
} 
