const express = require("express");
const router = express.Router();
const axios = require("axios");
const Booking = require("../../models/Booking")
const Host = require("../../models/Host");
const Lodging = require("../../models/Lodging");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//POST del nuevo booking de Guest
router.post("/:guestId/:lodgingId", async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body)
    newBooking.lodgingId = toId(req.params.lodgingId)
    newBooking.guestId = toId(req.params.guestId)
    const lodging = await Lodging.findById(req.params.lodgingId)
    newBooking.costNight = lodging.price
    newBooking.totalPrice = (newBooking.costNight * newBooking.night)
    newBooking.save();
    res.status(200).json(newBooking);
  } catch (error) {
    res.status(400).send("Booking not created");
    console.log(error);
  }
});

//trae las reservas de un guest
router.get("/:guestId", async (req, res)=>{

   Booking.find({guestId: req.params.guestId}, (error,docs)=>{

    res.send(docs)
   })

  
})

module.exports = router;
