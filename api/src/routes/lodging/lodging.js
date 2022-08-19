const router = require("express").Router();
const Lodging = require("../../models/Lodging");
const Host = require("../../models/Host");
const mongoose = require ("mongoose")
const toId = mongoose.Types.ObjectId

//esta crea el hospedaje y le asigna el host
router.post("/:hostId", async (req, res) => {
try{
  const newLodging = await Lodging.create(req.body)
 newLodging.hostId = toId(req.params.hostId)
 newLodging.save()
  res.json(newLodging)
}catch(err){
  res.json(err)
}
}) 


// esto crea una relacion al hacer get
/* router.get("/relacionado/:lodgingId/:hostId", async (req, res) => {

  req.params.hostId = toId(req.params.hostId)
  const lodging = await Lodging.findById(req.params.lodgingId)
  lodging.hostId = req.params.hostId
  lodging.save()
  res.json(lodging)

}); */


//trae todos los hospedajes con la info agregada del host
router.get("/all", async (req, res) => {

 const lodging = await Lodging.find({}).populate({path:"hostId", model: "Host"});
 res.json(lodging)
}); 


///////////trae el lodging con toda la info del host////////////
 router.get("/", async (req, res) => {
  const lodging = await Lodging.find({}).populate({path:"hostId", model: "Host"})
  res.send(lodging)

  /* Lodging.find({},  (err, lodging) =>{ 
      res.status(200).send(lodging);
    
  }) */
}); 

module.exports = router;



