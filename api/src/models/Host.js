const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const hostSchema = new Schema({

  guestId: {type: mongoose.Types.ObjectId, ref: "Guest"},
  dni: { type: String, required: true },

  hostDniPicture: { type: String },
  lodgingId: {type: mongoose.Types.ObjectId, ref: "Lodging"}, 
});

// hostSchema.methods.setImgUrl = function setImgUrl (filename) {
//   this.hostDniPicture = "http://localhost:3001/files/uploads/" + filename
// }


const model = mongoose.model("Host", hostSchema);

module.exports = model;