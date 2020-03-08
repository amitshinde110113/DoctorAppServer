const mongoose = require('mongoose');
const User = require('../models/user');
const random = require('random');
const mailController=require('./mailController');
// Register new User
exports.signUp = (req, res, next) => {
    console.log(req.body)
    User.find({ email: req.body.email }).exec().then(result => {
        if (result.length >= 1) {
            res.status(403).json({ message: 'Already exist.' })
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                // contactNumber: req.body.contactNumber,
                // profiePic: (req.file ? req.file.path : "uploads/default.jpg")
            });
            user.save().then(result => {
                res.status(201).json({
                    message: 'Registered successfully.',
                    user: result,
                });
            }).catch(err => {
                res.status(400).json({ error: err });
            });
        }
    });
}

// Login using Email Password

exports.login = (req, res, next) => {
    console.log(req.body.email)
    User.findOne({ email:req.body.email }).exec()
        .then((result) => {console.log(result)
            if (result.password === req.body.password) {
                result.loginStatus = 'Success';
                res.status(201).json(result)
            } else {
                res.status(401).json({ error: 'Please enter valid credentials.' });
            }
        })
        .catch(err => {
            console.log('eeeeee',err)

            res.status(404).json({ error: err });
        });
}

exports.getUsers = (req, res, next) => {
    User.find().then(result => {
        res.status(201).json(result);
    })
}
// Update User by ID

exports.update = (req, res, next) => {
    var data = req.body;
    var id = req.params.id;
    console.log(data, id)
    User.findByIdAndUpdate(id, data, { new: true }).exec()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}


// Remove User by Id

exports.remove = (req, res, next) => {
    const id = req.params.id;
    User.findById(hospitalId).exec()
        .then((user) => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}


exports.getOTP = async (req, res, next) => {
    const email = req.params.email;
    const OTP = random.int(min = 1000, max = 9999);
    try {

        const user = await User.find({ email: email })
        if (user.length) {
            res.status(403);
        } else {
         const data=  await mailController.sendResetMail(email, OTP);
        //   console.log(data);
         res.status(200).json({otp:OTP,email:email});
        }
    } catch (error) {
        // console.log('---------------ERRR-------------------------------',error)
            res.status(500).json({ error: error });
            // res.status(500);

    }

}