const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const hospitalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        }
    ],
    name: String,
    address: Object,
    contact: String,
    regstrationNo: String,
    fascilities: [],
    geoLocation: {
        type: { type: String },
        coordinates: [Number],
    },
    profile: String,
    attachments: [],
    reviews: [
        {
            review: String,
            likes: Number,
            dislikes: Number
        }
    ],
    openHours: { type: String },
    status: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }

});
hospitalSchema.plugin(timestamps);
module.exports = mongoose.model('Hospital', hospitalSchema);