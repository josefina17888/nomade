const express = require("express");
const router = express.Router();
const upload = require("../../../libs/storage")
const Host = require("../../models/Host");
const axios = require("axios");
const Lodging = require("../../models/Lodging");
const mongoose = require ("mongoose")
const toId = mongoose.Types.ObjectId


/// postea el host 

/// postea el host 


router.post("/:guestId", upload.single("picture"), async (req, res) => {

  const filename = req.file
  try {
    const myHost = await Host.create(req.body);
    myHost.guestId = toId(req.params.guestId);
    if(filename) {
      myHost.setImgUrl(req.file.filename)
  }
    myHost.save()
        res.status(200).json(myHost)
    } catch (error) {
        res.status(400).send('no se pudo guardar el Host')
        console.log(error)
    }

});

/// trae todos los lodgings de un host
router.get("/:hostId", async (req, res) => {
  Lodging.find({hostId: req.params.hostId}, (error,docs)=>{

      res.send(docs)
  })


})

//TRAE TODOS LOS HOSTS///
  router.get("/", async (req, res) => {

    Host.find({}, function (err, host) {
        res.status(200).send(host);
      });
    });

  

  module.exports = router;


