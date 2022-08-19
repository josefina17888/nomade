const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostSchema = new Schema({
  guestId: {type: mongoose.Types.ObjectId, ref: "Guest"},
  dni: { type: String, required: true },
<<<<<<< HEAD
  hostDniPicture: { type: String, required: true },
  lodgingId: {type: mongoose.Types.ObjectId, ref: "Lodging"}, 
=======
  hostDniPicture: { type: String },
  lodgingId: [{type: mongoose.Types.ObjectId, ref: "Lodging"}], 
>>>>>>> 0cf9eeb0e5207b709a95dfe466b7516c0405008a
});

const model = mongoose.model("Host", hostSchema);

module.exports = model;