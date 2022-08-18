const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LodgingSchema = new Schema({
  
  lodgingType: { type: String },
  rooms: { type: Number  },
  typeOfRoom: [{ type: String }],
  bathrooms: { type: Number },
  typeOfBathrooms: { type: String },
  price:{ type: Number},
  city: { type: String },
  country: { type: String },
  address: { type: String },
  numOfGuests: { type: Number },
  checkIn: { type: String },
  checkOut: { type: String },
  services: {
    wifi: { type: Boolean },
    ac: { type: Boolean },
    tv: { type: Boolean },
    security: { type: Boolean },
    cleaning: { type: Boolean },
    parking: { type: Boolean },
    laundry: { type: Boolean },
    hotWater: { type: Boolean },
    kitchen: { type: Boolean },
    pool: { type: Boolean },
    dining: { type: Boolean },
    pets: { type: Boolean },
  },
  description: { type: String },
  hostId: {
    type: Schema.ObjectId,
    ref: "Host",
  },
  bookingId: {
    type: Schema.ObjectId,
    ref: "Booking",
  },
  LodgingReviewId: {
    type: Schema.ObjectId,
    ref: "LodgingReview",
  },
});

const model = mongoose.model("Lodging", LodgingSchema);

module.exports = model;
 