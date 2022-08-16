const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HostSchema = new Schema({
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
  Lodging: [
    {
      type: Schema.ObjectId,
      ref: "Lodging",
    },
  ],
});

const model = mongoose.model("Host", HostSchema);

module.exports = model;
