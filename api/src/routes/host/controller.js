const Model = require("../../models/Host");

async function addHost ( name , lastname , email , cellPhone , dni , country,filename, birthDate) {
    
    if ( !name || !lastname || !email || !cellPhone || !dni || !country || !birthDate ) {
        return "Faltan datos"
    }
  
    const newHost = new Model({
         name , lastname , email , cellPhone , dni , country, birthDate
    });

    if(filename) {
        newHost.setImgUrl(filename)
    }

    try{
        await newHost.save()
        return newHost
    }
    catch(error){
        console.log(error)
    }
   

}


module.exports = {
    addHost,
}
