const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:String,            //Pattient name
    contactNo:String,       //Patient contact
    appointmentNo: Number,
    priority: String,       //HIGH LOW
    status: String,          // ACTIVE ARCHIVED DONE DELETED 
    type: String,            // ADVANCE CURRENT
    fees: Number,
    isPaid: Boolean,
    isRefunded: Boolean,
    timeSlot: String, 
    appointmentDay:Date,
       // FOR ADVANCE SCHEDULE
});
module.exports = mongoose.model('Appointment', appointmentSchema);