const router = require("express").Router();
const Lodging = require("../../models/Lodging");
const Host = require("../../models/Host");
<<<<<<< HEAD
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
=======
>>>>>>> 054d9ba0ca5b364cda319efd7096f8e7ce2aaeb4

router.get("/:hostId/", async (req, res) => {
  const lodging = await Lodging.find({}).populate({path:"hostId", model: "Host"})
  res.send(lodging)
});

<<<<<<< HEAD
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
=======
router.get("/", async (req, res) => {

  Lodging.find({}, function (err, lodging) {
    Host.populate(lodging, { path: "hostId" }, function (err, lodging) {
      res.status(200).send(lodging);
    });
  });
});
>>>>>>> 054d9ba0ca5b364cda319efd7096f8e7ce2aaeb4

module.exports = router;

