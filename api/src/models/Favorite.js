const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const FavoriteSchema = new Schema({
    guestId:{
        type: mongoose.Types.ObjectId,
        ref: "Guest"
    },
    lodgingId:{
        type: mongoose.Types.ObjectId,
        ref: "Lodging"
    },
 

});


const model = mongoose.model("Favorite", FavoriteSchema);

module.exports = model;