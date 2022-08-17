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

async function addGuest (username, name , lastname , email , cellPhone , dni , country,filename, birthDate) {
    
    if (!username || !name || !lastname || !email || !cellPhone || !dni || !country || !birthDate ) {
        return "Faltan datos"
    }

        console.log(filename)
        let fileUrl = ""
        if(filename){
            fileUrl = "http://localhost:3000/api/public/files/uploads/images/" + filename + ".jpg"
        }
        console.log("fileUrl:", fileUrl)

    const newGuest = {
        username, name , lastname , email , cellPhone , dni , country,picture: fileUrl, birthDate
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


