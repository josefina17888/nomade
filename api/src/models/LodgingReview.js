const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lodgingReviewSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'Guest'
    },
    lodgingId: {
        type: Schema.ObjectId,
        ref: 'Lodging'
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

const model = mongoose.model("LodgingReview", lodgingReviewSchema);
module.exports = model;