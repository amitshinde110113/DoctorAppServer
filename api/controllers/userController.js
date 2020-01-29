const mongoose = require('mongoose');
const User = require('../models/user');

// Register new Doctor
exports.signUp = (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(result => {
        if (result.length >= 1) {
            res.status(401).json({ message: 'Already exist.' })
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                contactNumber: req.body.contactNumber,
                // profiePic: (req.file ? req.file.path : "uploads/default.jpg")
            });
            user.save().then(result => {
                res.status(201).json({
                    message: 'Registered successfully.',
                    user: result,
                });
            }).catch(err => {
                res.status(500).json({ error: err });
            });
        }
    });
}

// Login using Email Password

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec()
        .then((result) => {
            if (result.password === req.body.password) {
                result.loginStatus='Success';
                res.status(201).json(result)
            } else {
                res.status(404).json({ error: 'Please enter valid credentials.' });
            }
        })
        .catch(err => {
            res.status(404).json({ error: err });
        });
}

exports.getUsers=(req,res,next)=>{
    User.find().then(result=>{
        res.status(201).json(result);
    })
}
// Update User by ID

exports.update = (req, res, next) => {
    var data = req.body;
    var id = req.params.id;
    console.log(data,id)
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
