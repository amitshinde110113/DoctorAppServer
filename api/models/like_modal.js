const mongoose = require('mongoose');


const likeDeslikeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: String,
});
module.exports = mongoose.model('LikeDislike', likeDeslikeSchema);