const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BookingSchema = new mongoose.Schema({
  // checkIn: { type:String, required: true },
  // checkOut: { type: String, required: true },
  checkIn: { type: Date},
  checkOut: { type:Date },
  night: { type: Number },
  guests: { type: Number},
  costNight: { type: Number },
  totalCost: { type: Number },
  lodgingId: {
    type: Schema.ObjectId,
    ref: "Lodging",
  } ,
  guestId: {
    type: Schema.ObjectId,
    ref: "Guest",
  }
});

const model = mongoose.model("Booking", BookingSchema);
module.exports = model;
