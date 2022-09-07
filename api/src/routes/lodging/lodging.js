require("dotenv").config();
const router = require("express").Router();
const Lodging = require("../../models/Lodging");
const Booking = require('../booking/booking');
const Host = require("../../models/Host");
const mongoose = require("mongoose");
const upload = require("../../../libs/storage")
const toId = mongoose.Types.ObjectId;
const {addServices} = require("./controller")
const cloudinary = require("../../../libs/cloudinary")



//BUSCA LODGING Y REALCIONA EL HOST
router.post("/:hostId",upload.array("picture"), async (req, res) => {
  try {
    console.log(req.body)
    let fotos = req.files.map(e=>e.path)
    console.log("hola1")
    let result=[]
    for(let i=0; i<fotos.length; i++)
    {
    result.push(await cloudinary.uploader.upload(fotos[i]))
    }
    console.log("hola1")
    const newLodging = await new Lodging(req.body);
    let fotosSubidas = result.map(e=>e.url)
    let service = await addServices(req.body)
    newLodging.services = service
    newLodging.ownBathroom= req.body.ownBathroom === "on" ? true : false
    newLodging.picture= fotosSubidas
    newLodging.city = req.body.city.toLowerCase()
    newLodging.hostId = toId(req.params.hostId);
    newLodging.latitud = req.body.latitud
    newLodging.save();
    res.redirect("http://localhost:3000/")  
    // res.redirect("https://nomade-khaki.vercel.app/")
  } catch (err) {
    res.status(400).send("No se pudo crear el alojamiento");
  }
});

///trae todos los lodgings(FUNCIONA)
/*  router.get("/", async (req, res) => {
  Lodging.find({},  (err, lodging) =>{ 
    res.status(200).send(lodging);
})
});  */



///////////trae el lodging con toda la info del host (FUNCIONA)////////////

router.get("/host/lodging", async (req, res) => {
  const lodgingId = req.body.lodgingId 
  const lodging = await Lodging.find({lodgingId}).populate({path:"hostId", model: "Host"})
  console.log(lodging,"ID")
  console.log(lodging.hostId, 'GO')
  res.send(lodging) 
 });

///BUSCA POR CIUDAD O TRAE TODO (FUNCIONA)
router.get("/", async (req, res) => {
  const citySearching = await req.query.city;
  allLodgings = await Lodging.find();
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

/// trae todos los lodgings de un host FUNCIONA
router.get("/:hostId", async (req, res) => {
  let hostId = toId(req.params.hostId)
  Lodging.find({hostId: hostId}, (error,docs)=>{
      res.send(docs)
  })
})

//MODIFICA ALOJAMIENTO A VISIBILITY FALSE
router.patch("/detail/:id", async (req, res) => {
      
  try {
    let lodgingId = toId(req.params.id)
    await Lodging.findByIdAndUpdate(lodgingId, { Visibility: 'false' }).exec();
    res.send("actualizado con exito")
  } catch (error) {
  res.status(400).send("no se pudo actualizar el lodging");
  console.log(error);
}
})

// esto crea una relacion al hacer get (FUNCIONA)
/* router.get("/relacionado/:lodgingId/:hostId", async (req, res) => {
  req.params.hostId = toId(req.params.hostId)
  const lodging = await Lodging.findById(req.params.lodgingId)
  lodging.hostId = req.params.hostId
  lodging.save()
  res.json(lodging)

}); */




module.exports = router;
