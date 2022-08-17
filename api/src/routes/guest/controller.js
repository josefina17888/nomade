const Model = require("../../models/Guest");

async function getGuest (filterGuest){
    try {
        let filter = {}
        if (filterGuest !== undefined ){
          filter = { "_id": filterGuest }
        }
        const guest = await Model.find(filter)
        return guest;
      } catch (error) {
        console.log(error)
      }    
}

async function addGuest (username, name , lastname , email , cellPhone , dni , country,picture, birthDate) {
    
    if (!username || !name || !lastname || !email || !cellPhone || !dni || !country || !picture || !birthDate ) {
        return "Faltan datos"
    }

    const newGuest = {
        username, name , lastname , email , cellPhone , dni , country,picture, birthDate
    };
    try{
        const myGuest = await new Model(newGuest);
        myGuest.save()
        return myGuest
    }
    catch(error){
        console.log(error)
    }
   

}

async function upDate (id , body) {
    if (!id) {
        return "Falta Id"
    }
    const newUpdate = await Model.findByIdAndUpdate(id,body)
    newUpdate.save()
    
}

async function deleteMessage (id) {
    if (!id) {
        return "Falta Id"
    }
    const deleteGuest = await Model.deleteOne({_id:id})
    return deleteGuest
}





module.exports = {
    addGuest,
    getGuest,
    upDate,
    deleteMessage
}


