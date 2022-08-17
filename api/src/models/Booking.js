const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BookingSchema = new mongoose.Schema({
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  night: { type: Number, required: true },
  guests: { type: Number, required: true },
  costNight: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  hostId: {
    type: Schema.ObjectId,
    ref: "Host",
  },
  guestId: {
    type: Schema.ObjectId,
    ref: "Guest",
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
