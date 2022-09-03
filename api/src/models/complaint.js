const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const complaintSchema = new Schema({
    tipo:{type: String},
    descripcion: {type: String, },
    lodgingId : {type: String},
    guestId : {type: String},
    dated: {
        type: Date
    }
}, { versionKey: false});


const model = mongoose.model("complaint", complaintSchema);

module.exports = model;