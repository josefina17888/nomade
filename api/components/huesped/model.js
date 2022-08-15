const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String,
    email: String
      
})

const model = mongoose.model("Huesped",mySchema);

module.exports = model;