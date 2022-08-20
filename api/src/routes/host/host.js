const express = require("express");
const router = express.Router();
const upload = require("../../../libs/storage")
const Host = require("../../models/Host");
const axios = require("axios");
const Lodging = require("../../models/Lodging");
const mongoose = require ("mongoose")
const toId = mongoose.Types.ObjectId

/// postea el host 

router.post("/:guestId", upload.single("picture"), async (req, res) => {
  const {name , lastname , email , cellPhone , dni ,country, birthDate } = req.body
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

//ver todos los Host
router.get("/", async (req, res) => {

    Host.find({}, function (err, host) {
        res.status(200).send(host);
      });
    });

//ver todas las reservaciones de un complejo de un host
  router.get('/:hostId/:lodgingId', async(req, res)=>{
    try {
        Booking.find({lodgingId: req.params.lodgingId},(error, bookings)=>{
            console.log(bookings)
            res.json(bookings)
        })
    }
    catch(error) {
        res.status(500).send(error)
    }
  })

  router.put("/:id", async (req, res) => {
    const { name, lastname, email, cellPhone, country, photo } = req.body;
  
    try {
      await Host.findByIdAndUpdate(req.params.id, req.body);
      res.send('Actualizado con exito')
    } catch (error) {
      res.status(400).send("no se pudo actualizar el Host");
      console.log(error);
    }
  })

  module.exports = router;
