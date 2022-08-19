const mongoose = require("mongoose");
const Host = require('../models/Host')
const Schema = mongoose.Schema;


const LodgingSchema = new mongoose.Schema({
  
  lodgingType: { type: String },
  guests: {type: Number},
  rooms: { type: Number  },
  typeOfRoom: [{ type: String }],
  beds:[{type: String}],
  bathrooms: { type: Number },
  ownBathroom: { type: Boolean },
  price:{ type: String },
  picture: [{ type: String }],
  city: { type: String },
  country: { type: String },
  address: { type: String },
  numOfGuests: { type: Number },
  checkInHour: { type: String },
  checkOutHour: { type: String },
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
    type: mongoose.Types.ObjectId, 
    ref:"Host",
  },
 bookingId: {
    type: Schema.ObjectId,
    ref: "Booking"},
  
  LodgingReviewId: {
    type: Schema.ObjectId,
    ref: "LodgingReview",
  }, 
  
});

LodgingSchema.methods.setImgUrl = function setImgUrl (filename) {
  this.picture = "http://localhost:3001/files/uploads/" + filename
}


const model = mongoose.model("Lodging", LodgingSchema);

module.exports = model;