const express = require("express");
const router = express.Router();
const axios = require("axios");
const Booking = require("../../models/Booking");
const Host = require('../../models/Host');
const { default: mongoose } = require("mongoose");
const toId = mongoose.Types.ObjectId;

router.get('/', async(req, res) =>{
    Booking.find(function (err, booking) {
        if (err) res.send(500, err.message);
    
        console.log("GET /booking");
        res.status(200).json(booking);
      })
}) 

router.post("/:id", async (req, res) => {
  try {
    const booking = toId(req.params.hostId)
    console.log(booking)
    /* const host = Host.findById(req.params)
    console.log(host) */
    /* const booking = new Booking(req.body);
    booking.save()
    console.log(booking)
    Host.populate(booking, { path: "hostId" })
    res.status(200).json(booking); */

  } catch (error) {
      res.status(500).json(error)
  }
}); 

module.exports = router;


