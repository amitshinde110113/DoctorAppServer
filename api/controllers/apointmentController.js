const mongoose = require('mongoose');
const AppointModal = require('../models/appointment_model');

// Book new appointment
exports.create = (req, res, next) => {

    const appointModal = new Doctor({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        appointmentNo: req.body.appointmentNo,
        priority: req.body.priority,
        status: req.body.status,
        type: req.body.type,
        fees: req.body.fees,
        isPaid: req.body.isPaid,
        isRefunded: req.body.isRefunded,
        timeSlot: req.body.timeSlot,
        // profiePic: (req.file ? req.file.path : "uploads/default.jpg")
    });
    appointModal.save().then(result => {
        res.status(201).json({
            message: 'Appointment booked.',
            user: result,
        });
    }).catch(err => {
        res.status(500).json({ error: err });
    });


}

// Get Appointments of specific Doctor

exports.get = (req, res, next) => {
    AppointModal.find(req.body.condition).exec()
        .then((result) => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(404).json({ error: err });
        });
}

// Update Doctor by ID

exports.update = (req, res, next) => {
    var data = req.body;
    var id = req.body._id;
    AppointModal.findByIdAndUpdate(id, data, { new: true }).exec()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}


// Remove doctor by Id

exports.remove = (req, res, next) => {
    AppointModal.findById(req.body._id).exec()
        .then((doctor) => {
            res.status(201).json(doctor);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}
