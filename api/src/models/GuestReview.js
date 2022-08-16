const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestReviewSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'Guest'
    },
    hostId: {
        type: Schema.ObjectId,
        ref: 'Host'
    },
    rating: {
        type: Number,
        required: true,
        minimum: 1,
        maximum: 5

    },
    comments: {
        type: String
    },
    dated: {
        type: Date,
        required: true
    }
})

const model = mongoose.model("GuestReview", guestReviewSchema);
module.exports = model;