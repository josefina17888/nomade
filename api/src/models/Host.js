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
  photo: {
    type: String,
  },
  lodgingId: [{type: mongoose.Types.ObjectId, ref: "Lodging"}], 
});
hostSchema.methods.setImgUrl = function setImgUrl (filename) {
  this.photo = `http://localhost:3001/files/uploads/${filename}`
}

const model = mongoose.model("Host", hostSchema);

module.exports = model;