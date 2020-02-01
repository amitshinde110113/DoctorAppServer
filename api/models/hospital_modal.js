const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        }
    ],
    name: String,
    address: String,
    contact: String,
    regstrationNo: String,
    fascilities: [],
    geoLocation: String,
    profile:String,
    attachments:[],
    reviews: [
        {
            review: String,
            likes: Number,
            dislikes: Number
        }
    ],
    openHours: { type: String },
    status:String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
    
});
module.exports = mongoose.model('Hospital', hospitalSchema);