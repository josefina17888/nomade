
const Lodging = require("../../models/Lodging");
async function addLodging (lodgingType) {
    
    
    const newLodging = new Lodging({
        lodgingType
    });
   
   

    try{
        await newLodging.save()
        return newGuest
    }
    catch(error){
        console.log(error)
    }
   

}

module.exports = {
    addLodging
}
