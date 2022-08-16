
const {Schema,model} = require('mongoose')

const mySchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    phone: Number,
    dni: String,
    country:String,
    birthday: Date,
    photo: String,
    Hospedaje: {
            type: Schema.ObjectId,
            ref: "Hospedaje"
        }
    })
    
const model = model('Anfitrion',mySchema);
    
module.exports = model;