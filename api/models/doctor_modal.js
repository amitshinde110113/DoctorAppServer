const mongoose = require('mongoose');


const doctorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ],
    hospitals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital'
        }
    ],
    name: String,
    profile: String,
    address: String,
    password: String,
    contact: String,
    email: String,
    regstrationNo: String,
    specilizations: [],
    consultationCharge: String,
    experience: { type: String, default: '1' },

    reviews: [
        {
            reviewBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            review: String,
            likes: {type:Number,default:0},
            dislikes: {type:Number,default:0}
        }
    ],
    likes: 0,
    disLikes: 0,
    ratings: {
        rateCount: 0,
        rateValue: 0,
        rateAverage: 0
    },
    workingHours: [
        {
            day: { type: String },
            enable: {
                type: Boolean,
                default: true
            },
            breakStart: {
                type: String
            },
            breakEnd: {
                type: String
            },
            start: {
                type: String
            },
            end: {
                type: String
            }
        },
    ],

});
module.exports = mongoose.model('Doctor', doctorSchema);