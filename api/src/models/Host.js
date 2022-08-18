const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostSchema = new Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  cellPhone: {
    type: String,
  },
  dni: String,
  country: String,
  birthDate: Date,
  photo: String,
  lodgingId: [{type: mongoose.Types.ObjectId, ref: "Lodging"}], 
});

const model = mongoose.model("Host", hostSchema);

module.exports = model;