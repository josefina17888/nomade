const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const GuestSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, min: 6 },
  cellPhone: { type: String },
  dni: { type: String },
  country: { type: String },
  picture: { type: String },
  booking: [{ type: Schema.ObjectId, ref: "Booking" }, ],
  reviews: [{ type: Schema.ObjectId, ref: "GuestReview", }, ],
  birthDate: { type: Date },
  // public_id: {
  //   type: String
  // }
});


GuestSchema.methods.setImgUrl = function setImgUrl (filename) {
  console.log(filename)
  this.picture = "http://localhost:3001/files/uploads/" + filename
}

// Para encriptar el password (antes del save) (bcrypt , salt y hash)
GuestSchema.pre("save", async function(next) {
  if(!this.isModified("password")){
    next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)

})

// Cuando haces login y haga match con la contraseña

GuestSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword , this.password)
};


const model = mongoose.model("Guest", GuestSchema);
module.exports = model;
