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

async function addGuest (username, name , lastname , email , cellPhone , dni , country,picture, birthDate,password) {
    
    if (!username) {
        return "Faltan datos"
    }
  
    const newGuest = new Model({
        username, name , lastname , email , cellPhone , dni , country, birthDate,password
    });
   console.log(picture)
    if(picture) {
        newGuest.setImgUrl(picture)
    }

    try{
        await newGuest.save()
        return newGuest
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
    addGuest
}
