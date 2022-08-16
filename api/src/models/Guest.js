const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  cellPhone: {
    type: String,
  },
  country: { type: String },
  picture: { type: String },
  booking: [
    {
      type: Schema.ObjectId,
      ref: "Booking",
    },
  ],
  reviews: [
    {
      type: Schema.ObjectId,
      ref: "GuestReview",
    },
  ],
  dateBirth: { type: Date },
});

const model = mongoose.model("Guest", guestSchema);
module.exports = model;
