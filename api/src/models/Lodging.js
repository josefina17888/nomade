const mongoose = require("mongoose");
const Host = require('../models/Host')
const Schema = mongoose.Schema;


const LodgingSchema = new mongoose.Schema({
  
  lodgingType: { type: String, required:true },
  title:{type: String},
  guests: {type: Number, required:true },
  rooms: { type: Number, required:true },
  typeOfRoom: [{ type: String, required:true }],
  beds:{type: Number, required:true }, 
  bathrooms: { type: Number },
  ownBathroom: { type: Boolean },
  price:{  type: Number, required:true},
  currency: { type: String, required:true },
  picture: [{ type: String, required:true }],
  city: { type: String, required:true },
  country: { type: String, required:true },
  address: { type: String, required:true },
  checkInHour: { type: String },
  checkOutHour: { type: String },
  
  services: [{
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
  }],
  description: { type: String, required:true  },
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




const model = mongoose.model("Lodging", LodgingSchema);

module.exports = model;
