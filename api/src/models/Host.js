const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostSchema = new Schema({
<<<<<<< HEAD
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
  picture: String,
  Lodging: [
    {
      type: Schema.ObjectId,
      ref: "lodging",
    },
  ],

=======
  guestId: {type: mongoose.Types.ObjectId, ref: "Guest"},
  dni: { type: String, required: true },
  hostDniPicture: { type: String },
  lodgingId: [{type: mongoose.Types.ObjectId, ref: "Lodging"}], 
>>>>>>> 0cf9eeb0e5207b709a95dfe466b7516c0405008a
});

hostSchema.methods.setImgUrl = function setImgUrl (filename) {
  this.picture = "http://localhost:3001/files/uploads/" + filename
}


const model = mongoose.model("Host", hostSchema);

module.exports = model;