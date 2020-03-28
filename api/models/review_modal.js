const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reviewBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    review: String,
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
 
});
module.exports = mongoose.model('Review', reviewSchema);