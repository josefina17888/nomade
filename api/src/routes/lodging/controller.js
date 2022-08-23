
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

async function addServices(service){
    object= {}
    object.wifi= service.wifi === "on" ? true : false 
    object.ac= service.ac=== "on" ? true : false 
    object.tv= service.tv=== "on" ? true : false 
    object.security= service.security=== "on" ? true : false 
    object.cleaning= service.cleaning=== "on" ? true : false 
    object.parking= service.parking=== "on" ? true : false 
    object.laundry= service.laundry=== "on" ? true : false 
    object.hotWater= service.hotWater=== "on" ? true : false 
    object.kitchen= service.kitchen=== "on" ? true : false 
    object.pool= service.pool=== "on" ? true : false 
    object.dining= service.dining=== "on" ? true : false 
    object.pets= service.pets=== "on" ? true : false 
   console.log(object)
   return object
}

module.exports = {
    addLodging,
    addServices
}
