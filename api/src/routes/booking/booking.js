const express = require("express");
const router = express.Router();
const axios = require("axios");
const Booking = require("../../models/Booking");
const Host = require("../../models/Host");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//POST del nuevo booking de Guest
router.post("/:guestId/:lodgingId", async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body)
    newBooking.lodgingId = toId(req.params.lodgingId)
    newBooking.guestId = toId(req.params.guestId)
    newBooking.save();
    res.status(200).json(newBooking);
  } catch (error) {
    res.status(400).send("Booking not created");
    console.log(error);
  }
});

module.exports = router;
