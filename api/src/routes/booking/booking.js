const express = require("express");
const router = express.Router();
const axios = require("axios");
const Booking = require("../../models/Booking");
const Host = require("../../models/Host");
const Lodging = require("../../models/Lodging");
const Guest = require("../../models/Guest");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//POST del nuevo booking de Guest
router.post("/", async (req, res) => {
  const filtered = await Booking.find({allDates:req.body.allDates, lodgingId:req.body.lodgingId})
  if(!filtered.length){
    try {
      const newBooking = await Booking.create(req.body);
      newBooking.lodgingId = toId(req.body.lodgingId);
      newBooking.hostId = toId(req.body.hostId);
      const infoGuest = await Guest.find({ email: req.body.email });
      let userId = infoGuest[0]._id;
      newBooking.totalPrice = newBooking.costNight * newBooking.night;
      newBooking.guestId = userId;
      newBooking.save();
      res.status(200).json(newBooking);
    } catch (error) {
      res.status(400).send("Booking not created");
      console.log(error);
    }
  }else{
    res.status(500).json("err");
  }
});

//trae las reservas de un guest
router.get("/all/:guestId", async (req, res) => {
  Booking.find({ guestId: req.params.guestId }, (error, docs) => {
    res.send(docs);
  });
});

//trae las reservas de un lodging de un guest
router.get("/:lodgingId/:guestId", async (req, res) => {
  Booking.find({ lodgingId: req.params.lodgingId, guestId: req.params.guestId }, (error, docs) => {
    res.send(docs);
  });
});

//RUTA GET PERO NO FUNCIONABA ASÍ QUE ES POST-GET
router.post("/booking", async (req, res) => {
  const lodgingId = toId(req.body.lodgingId);
  Booking.find({ lodgingId: lodgingId }, (error, docs) => {
    res.json(docs);
  });
});

module.exports = router;
