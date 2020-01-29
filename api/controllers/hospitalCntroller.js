const mongoose = require('mongoose');
const Hospital = require('../models/hospital_modal');
var _ = require('lodash');

// Create new hospital
exports.create = (req, res, next) => {
    try {
        const hospital = new Hospital({
            _id: new mongoose.Types.ObjectId(),
            doctors: req.body.doctors,
            name: req.body.name,
            address: req.body.address,
            contact: req.body.contact,
            regstrationNo: req.body.regstrationNo,
            owner:req.body.owner,
            fascilities: req.body.fascilities,
            // geoLocation: req.body.geoLocation,
            // reviews: req.body.reviews,
            // openHours: req.body.openHours,
            // status: req.body.status,
        })
        hospital.save().then(result => {
            res.status(201).json(result)
        }).catch(err => {
            res.status(500).json({ error: err });
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// get hospital by Id

exports.get = (req, res, next) => {
    const id = req.params.Id;
    // console.log(id);

    Hospital.find({owner:id}).populate('doctors')
        .then((hospitals) => {
            res.status(201).json(hospitals)
        })
        .catch(err => {
            // console.log(err);

            res.status(401).json({ error: err });
        })
}

// get all hospital by pagination

exports.getAll = (req, res, next) => {
   
    Hospital.find().populate({ path: 'doctors' }).skip(skipReconrd).limit(limitReconrd)
        .then((hospitals) => {
            res.status(201).json(hospital)
        })
        .catch(err => {
            res.status(401).json({ error: err });
        })
}

// Update hospital by Id

exports.update = (req, res, next) => {
    var data = req.body;
    var id = req.params.id;
    Hospital.findByIdAndUpdate(id, data, { new: true }).exec()
        .then((result) => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

// Remove hospital by Id

exports.remove = (req, res, next) => {
    const id = req.params.hospitalId;
    Hospital.findById(hospitalId).exec()
        .then((hospital) => {
            res.status(500).json(hospital);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}
