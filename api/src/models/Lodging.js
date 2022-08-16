const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const lodgingSchema = new Schema({
        tipoHospedaje: {
          tipo: { type: String, require: true },
          numHabitaciones: { type: Number, default: null },
          tipoHabitacion: { type: String, default: null },
          numBaños: { type: Number, required: true },
          tipoBaño: { type: String, require: true },
        },
        ciudad: { type: String, require: true },
        pais: { type: String, require: true },
        ubicacion: { type: String, require: true },
        numHuespedes: { type: Number, require: true },
        CheckIn: { type: String, require: true },
        CheckOut: { type: String, require: true },
        servicios: [
          {
            wifi: { type: Boolean, require: true },
            ac: { type: Boolean, require: true },
            tv: { type: Boolean, require: true },
            seguridad: { type: Boolean, require: true },
            limpieza: { type: Boolean, require: true },
            estacionamiento: { type: Boolean, require: true },
            lavadora: { type: Boolean, require: true },
            aguaCaliente: { type: Boolean, require: true },
            cocina: { type: Boolean, require: true },
            piscina: { type: Boolean, require: true },
            comedor: { type: Boolean, require: true },
            pets: { type: Boolean, require: true },
          },
        ],
        descripcion: { type: String, require: true },
        
        
})

const model = mongoose.model("Lodging", lodgingSchema);

module.exports = model;
