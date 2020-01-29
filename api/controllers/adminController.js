
const mongoose=require('mongoose');
const random = require('random')

const User = require('../models/admin');
const mailController = require('../controllers/mailController');


exports.signUp=(req,res,next)=>{
 //   console.log(req.body.profiePic);
    
    

    User.find().exec().then(result=>{
        
               if(result.length >= 1){
                   res.status(401).json({message:'already exist'})
               }
               else{
   
                   const user = new User({
                                   _id : new mongoose.Types.ObjectId(),
                                   email:req.body.email,
                                   name: req.body.name,
                                   password:req.body.password,
                                   contactNumber:req.body.contactNumber,
                                  // profiePic: (req.file ? req.file.path : "uploads/default.jpg")

                                   });
                                   user.save().then(result=>{
                                       res.status(201).json({Message:'user created successfully',
                                       user:result.email,
                                       id:result._id
                                   
                                   });
                                   }).catch(err=>{
                                       res.status(500).json({error:err});
                                   });
               
               }
   
      }) 
      
      
       
   }


   exports.login=(req,res,next)=>{

    User.findOne({email:req.body.email}).exec()
    .then((result)=>{
        if(result.password===req.body.password)
        {
            res.status(201).json(result)
        }else{
            res.status(500).json({error:err});
        }
       
    })
    .catch( err=>{
            res.status(500).json({error:err});
        });

}


exports.update=(req,res,next)=>{
       console.log(req.body);
      
        User.findOneAndUpdate(req.body._id ,req.body,{new: true}).exec()
    .then((result)=>{
        console.log(result)
            res.status(201).json(result)
    })
    .catch( err=>{
            res.status(500).json({error:err});
        });
 
    

}



exports.getOTP=(req,res,next)=>{
    console.log('email--------------------------',);
    const email=req.params.email;
    const OTP=random.int(min = 1000, max = 9999);

    User.findOne({email:email}).exec()
    .then((result)=>{
       console.log(result);
       
        mailController.sendResetMail(result.email,OTP)
        res.status(200).json({'OTP':OTP,"_id":result._id})
       
    })
    .catch( err=>{
            res.status(404).json(err);
        });

}