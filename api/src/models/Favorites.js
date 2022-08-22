const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const favoriteSchema = new Schema({
    userFrom:{
        type: mongoose.Types.ObjectId,
        ref: 'Guest'
    },
    lodgingId:{
        type: mongoose.Types.ObjectId,
        ref: 'Lodging'
    },
    picture: [{
         type: String
    }],
    title:{
        type: String
    },
    guests: {
        type: Number,  
    },
    rooms: { 
        type: Number, 
    },
    beds:{
        type: Number 
    }, 
    currency: { 
        type: String
    },
    city: { 
        type: String
    },
  country: { 
    type: String
},
   
  
  
    
});



const model = mongoose.model("Favorite", favoriteSchema);

module.exports = model;