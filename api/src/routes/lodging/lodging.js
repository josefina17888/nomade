const router = require("express").Router();
const Lodging = require("../../models/Lodging");
const Host = require("../../models/Host");
const mongoose = require("mongoose");
const upload = require("../../../libs/storage")
const toId = mongoose.Types.ObjectId;

//BUCCA LODGING Y RELACIONA EL HOST
router.post("/:hostId", upload.single("picture"), async (req, res) => {
  try {
    const newLodging = await Lodging.create(req.body);
    newLodging.hostId = toId(req.params.hostId);
    newLodging.save();
    res.json(newLodging);
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
