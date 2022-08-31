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
  try {
    const newBooking = await Booking.create(req.body);
    newBooking.lodgingId = toId(req.body.lodgingId);
    const infoGuest = await Guest.find({ email: req.body.email });
    let userId = infoGuest[0]._id;
    const lodging = await Lodging.findById(req.body.lodgingId);
    newBooking.costNight = lodging.price;
    newBooking.totalPrice = newBooking.costNight * newBooking.night;
    newBooking.guestId = userId;
    newBooking.save();
    res.status(200).json(newBooking);
  } catch (error) {
    res.status(400).send("Booking not created");
    console.log(error);
  }
});

//trae las reservas de un guest
router.get("/:guestId", async (req, res) => {
  Booking.find({ guestId: req.params.guestId }, (error, docs) => {
    res.send(docs);
  });
});

//RUTA GET PERO NO FUNCIONABA ASÍ QUE ES POST-GET
router.post("/booking", async (req, res) => {
  const lodgingId = toId(req.body.lodgingId);
  console.log(lodgingId, 'FRONT')
  Booking.find({ lodgingId: lodgingId }, (error, docs) => {
    res.json(docs);
  });
});

module.exports = router;
