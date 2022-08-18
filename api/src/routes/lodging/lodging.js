const router = require("express").Router();
const Lodging = require("../../models/Lodging");
const Host = require("../../models/Host");

router.post("/lodging",upload.single("pictures"), async (req, res) => {
  //crear nuevo hospedaje
 
  const newLodging = new Lodging({
    lodgingType: req.body.lodgingType,
    rooms: req.body.rooms,
    typeOfRoom: req.body.typeOfRoom,
    bathrooms: req.body.bathrooms,
    typeOfBathrooms: req.body.typeOfBathrooms,
    city: req.body.city,
    country: req.body.country,
    address: req.body.address,
    numOfGuests: req.body.numOfGuests,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
   
    services: {
      wifi: req.body.wifi,
      ac: req.body.ac,
      tv: req.body.tv,
      security: req.body.security,
      cleaning: req.body.cleaning,
      parking: req.body.parking,
      laundry: req.body.laundry,
      hotWater: req.body.hotWater,
      kitchen: req.body.kitchen,
      pool: req.body.pool,
      dining: req.body.dinin,
      pets: req.body.pets,
    },
    description: req.body.description,
  });
  if(req.file.filename) {
    newLodging.setImgUrl(req.file.filename)
  }
  try {
     /* const relacion = await Lodging.aggregate([{
        $lookup:{
            from:"Host",
            localfield: "hostId",
            foreignField: "_id",
            as: "host"
        }
    }])
    console.log("*********relacion*********", relacion)  */
    // guardar usuario  y respuesta
    const lodging = await newLodging.save();
    console.log(lodging);

    res.status(200).json(lodging);
  } catch (err) {
    res.json(err);
  }
});

router.get("/", async (req, res) => {

  Lodging.find({}, function (err, lodging) {
    Host.populate(lodging, { path: "hostId" }, function (err, lodging) {
      res.status(200).send(lodging);
    });
  });
});

module.exports = router;

