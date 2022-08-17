const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LodgingSchema = new Schema({
  lodgingType: { type: String },

  rooms: { type: Number, default: null },
  typeOfRoom: [{ type: String, default: null }],
  bathrooms: { type: Number },
  typeOfBathrooms: { type: String },

  city: { type: String },
  country: { type: String },
  address: { type: String },
  numOfGuests: { type: Number },
  checkIn: { type: String },
  checkOut: { type: String },
  services: {
    wifi: { type: String },
    ac: { type: String },
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
});

const model = mongoose.model("Lodging", LodgingSchema);

module.exports = model;
