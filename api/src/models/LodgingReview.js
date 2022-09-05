const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LodgingReviewSchema = new Schema({
    guestId: {
        type: String,
    },
    lodgingId: {
        type: String,
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
  
    }
})

const model = mongoose.model("LodgingReview", LodgingReviewSchema);
module.exports = model;