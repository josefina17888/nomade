const router = require("express").Router();
const Lodging = require("../../models/Lodging");
const Host = require("../../models/Host");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

router.get("/:hostId/", async (req, res) => {
  const lodging = await Lodging.find({}).populate({path:"hostId", model: "Host"})
  res.send(lodging)
});

//get all Lodgings para mostrar en Home
router.get("/", async (req, res) => {
  Lodging.find({},  (err, lodging) =>{ 
    res.status(200).send(lodging);
})
}); 

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

  //get Lodgings filtrado por city
  router.get("/", async (req, res) => {
    let cityFiltered = req.query;
    if (cityFiltered){
      try {
        if (city !== undefined){
          await Lodging.find({city: cityFiltered},  (err, lodging) =>{
            console.log(cityFiltered); 
            res.status(200).send(lodging);
          })
        }
      } catch(error){
        res.json(error)
      }
    }
    else {
      res.status(404).send('Ocurrió un error')
    }

  });

module.exports = router;

