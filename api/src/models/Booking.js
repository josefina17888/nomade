const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BookingSchema = new mongoose.Schema({
  allDates: [{type: Date, required:true}],
  checkIn: { type:Date, required: true },
  checkOut: { type: Date, required: true },
  night: { type: Number, required: true },
  guests: { type: Number, required: true},
  costNight: { type: Number, required: true},
  totalPrice: { type: Number },
  pets: {type: Boolean},
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
