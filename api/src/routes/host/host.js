const express = require("express");
const router = express.Router();
const axios = require("axios");
const Host = require("../../models/Host");
const Booking = require("../../models/Booking");
const Lodging = require("../../models/Lodging");


router.post("/", async (req, res) => {
    try {
      const myHost = await new Host(req.body);
      myHost.save()
          res.status(200).json(myHost)
      } catch (error) {
          res.status(400).send('no se pudo guardar el Host')
          console.log(error)
      }
  
  });
  
  //Trae a todos los Host
  router.get("/", async (req, res) => {
    try {
      Host.find({}, function (err, host) {
        res.status(200).send(host);
      });
    } catch (error) {
      res.status(400).send('Hosts not found')
          console.log(error)
    }
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

  //Busca todos los lodgings de un host
  router.get("/:hostId", async (req, res) => {
    Lodging.find({hostId: req.params.hostId}, (error,docs)=>{
        res.send(docs)
    })
  })
  
  
  module.exports = router;


