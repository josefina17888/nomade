const router = require("express").Router();
const Lodging = require("../../models/Lodging");
const Host = require("../../models/Host");
const mongoose = require("mongoose");
const upload = require("../../../libs/storage")
const toId = mongoose.Types.ObjectId;
const cloudinary = require("cloudinary").v2;


cloudinary.config({ 
  cloud_name: 'dtw1cvtdr', 
  api_key: '828297737868324', 
  api_secret: 'SquU2x_RLJntjaBnd1nX2UpBFy8' 
});
//BUCCA LODGING Y REALCIONA EL HOST
router.post("/:hostId",upload.array("picture"), async (req, res) => {

  try {
    console.log(req.body.wifi)
    let fotos = req.files.map(e=>e.path)
    let result=[]
    for(let i=0; i<fotos.length; i++)
    {
    result.push(await cloudinary.uploader.upload(fotos[i]))
    }
    // const {lodgingType, guests,rooms,typeOfRoom, beds, bathrooms, ownBathroom, price, city, country, address, numOfGuests ,checkInHour ,checkOutHour ,description} = req.body
    const newLodging = await new Lodging(req.body);
    let fotosSubidas = result.map(e=>e.url)
    
    newLodging.picture= fotosSubidas
    newLodging.ownBathroom= req.body.ownBathroom === "on" ? true : false 
    newLodging.services.wifi= req.body.wifi === "on" ? true : false 
    newLodging.services.ac= req.body.ac=== "on" ? true : false 
    newLodging.services.tv= req.body.tv=== "on" ? true : false 
    newLodging.services.security= req.body.security=== "on" ? true : false 
    newLodging.services.cleaning= req.body.cleaning=== "on" ? true : false 
    newLodging.services.parking= req.body.parking=== "on" ? true : false 
    newLodging.services.laundry= req.body.laundry=== "on" ? true : false 
    newLodging.services.hotWater= req.body.hotWater=== "on" ? true : false 
    newLodging.services.kitchen= req.body.kitchen=== "on" ? true : false 
    newLodging.services.pool= req.body.pool=== "on" ? true : false 
    newLodging.services.dining= req.body.dining=== "on" ? true : false 
    newLodging.services.pets= req.body.pets=== "on" ? true : false 
   
    newLodging.hostId = toId(req.params.hostId);
   
    newLodging.save();
    res.redirect("http://localhost:3000/")
  } catch (err) {
    res.json(err);
  }
});

///trae todos los lodgings(FUNCIONA)
/*  router.get("/", async (req, res) => {
  Lodging.find({},  (err, lodging) =>{ 
    res.status(200).send(lodging);
})
});  */

///////////trae el lodging con toda la info del host (FUNCIONA)////////////
/* router.get("/all", async (req, res) => { 
  const lodging = await Lodging.find({}).populate({path:"hostId", model: "Host"})
  res.send(lodging) 
 }); */

///BUSCA POR CIUDAD O TRAE TODO (FUNCIONA)
router.get("/", async (req, res) => {
  const citySearching = await req.query.city;
  allLodgings = await Lodging.find();
  console.log(allLodgings)
  try {
    if (citySearching) {
      Lodging.find({ city: citySearching }, (err, lodging) => {
        res.send(lodging);
      });
    } else {
      res.json(allLodgings);
    }
  } catch (err) {
    res.json(err);
  }
});

///BUSCA UN LODGING POR ID/// (FUNCIONA)
router.get("/detail/:lodgingId", async (req, res) => {
  try {
    // Lodging.find({ _id: req.params.lodgingId }, (error, docs) => {
    //   res.json(docs);
    // });
    const findLodging = await Lodging.find({_id: req.params.lodgingId})
    const found = findLodging[0]
    res.json(found)
  } catch (err) {
    res.json(err);
  }
});

// esto crea una relacion al hacer get (FUNCIONA)
/* router.get("/relacionado/:lodgingId/:hostId", async (req, res) => {
  req.params.hostId = toId(req.params.hostId)
  const lodging = await Lodging.findById(req.params.lodgingId)
  lodging.hostId = req.params.hostId
  lodging.save()
  res.json(lodging)

}); */

module.exports = router;
