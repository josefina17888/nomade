const express = require("express");
const router = express.Router();
const axios = require("axios");
const Booking = require("../../models/Booking");

/* router.get('/', async(req, res) =>{
    Booking.find(function (err, booking) {
        if (err) res.send(500, err.message);
    
        console.log("GET /booking");
        res.status(200).json(booking);
      })
}) */

router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const booking = new Booking(req.body);
    booking.save()
    res.status(200).json(booking)
  } catch (error) {
      res.status(500).json(error)
  }
});

module.exports = router;
