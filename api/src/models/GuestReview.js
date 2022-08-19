const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuestReviewSchema = new Schema({
    guestId: {
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
        type: Date
    }
})

const model = mongoose.model("GuestReview", GuestReviewSchema);
module.exports = model;