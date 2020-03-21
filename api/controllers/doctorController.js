const mongoose = require('mongoose');
const Doctor = require('../models/doctor_modal');
const random = require('random')
const mailController = require('./mailController');
// Register new Doctor
exports.signUp = (req, res, next) => {
    Doctor.find({ email: req.body.email }).exec().then(result => {
        if (result.length >= 1) {
            res.status(401).json({ message: 'Already exist.' })
        } else {
            const doctor = new Doctor({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                contactNumber: req.body.contactNumber,
                // profiePic: (req.file ? req.file.path : "uploads/default.jpg")
            });
            doctor.save().then(result => {
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
    Doctor.findOne({ email: req.body.email }).exec()
        .then((result) => {

            if (result.password === req.body.password) {
                res.status(201).json(result)
            } else {
                res.status(404).json({ message: 'Please enter valid credentials.' });
            }
        })
        .catch(err => {
            res.status(404).json({ message: 'Not found.' });
        });
}

exports.getDoctors = (req, res, next) => {
    Doctor.find().then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(401).json(err);

    })
}
// Get doctor by id
exports.getDoctorById = (req, res, next) => {
    const id = req.params.id;
    Doctor.findOne({ _id: id }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(404).json(err);
    })
}

exports.listByCondition = (req, res, next) => {
    Doctor.find(req.body).exec().then(doctors => {
        res.status(201).json(doctors);
    }).catch(err => {
        res.status(404).json(err);
    })
}
// Update Doctor by ID

exports.update = (req, res, next) => {
    var data = req.body;
    var id = req.params.id;

    // delete data['_id'];
    if (data.changePassword) {
        Doctor.findById(id).then(doctor => {

            if (data.oldPassword == doctor.password) {
                updateDoctor(id, data);
            } else {
                res.status(402).json({ error: 'err' });
            }
        })
    } else {
        updateDoctor(id, data);
    }
    // res.status(201).json(result);
    function updateDoctor(id, data) {
        Doctor.findByIdAndUpdate(id, { $set: data }, { new: true }).exec()
            .then((result) => {
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(404).json({ error: err });
            });
    }
}

// Remove doctor by Id

exports.remove = (req, res, next) => {
    const id = req.params.id;
    Doctor.findById(hospitalId).exec()
        .then((doctor) => {
            res.status(201).json(doctor);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

exports.getOTP = (req, res, next) => {
    const email = req.params.email;
    const OTP = random.int(min = 1000, max = 9999);

    Doctor.findOne({ email: email }).exec()
        .then((result) => {
            mailController.sendResetMail(result.email, OTP)
            res.status(200).json({ 'OTP': OTP, "_id": result._id, 'profile': result.profile, 'name': result.name })
        })
        .catch(err => {
            res.status(404).json(err);
        });

}