const mongoose = require('mongoose');


const doctorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ],
    hospitals:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital'
        }
    ],
    name: String,
    address: String,
    password:String,
    contact: String,
    email: String,
    regstrationNo: String,
    specilizations: [],
    consultationCharge: String,
    reviews: [
        {
            review: String,
            likes: Number,
            dislikes: Number
        }
    ],
    workingHours: [
        {
            day: { type: String },
            enable: {
                type: Boolean,
                default: true
            },
            breakStart:{
                type:String
            },
            breakEnd:{
                type:String
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