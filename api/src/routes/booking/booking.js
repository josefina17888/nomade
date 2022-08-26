const express = require("express");
const router = express.Router();
const axios = require("axios");
const Booking = require("../../models/Booking")
const Host = require("../../models/Host");
const Lodging = require("../../models/Lodging");
const Guest = require('../../models/Guest')
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//POST del nuevo booking de Guest
router.post("/", async (req, res) => {
  console.log('HOLA ENTRAMOS')
  try {
    
    const dates = []
    let getDateInRange = (checkIn, checkOut) => {
      
      let start = new Date(checkIn)
      let end = new Date(checkOut)
      console.log(start ,end)
      let date = new Date(start.getTime())
      console.log(date)
      
      console.log(dates)
      while(date <= end) {
        dates.push(new Date(date).getTime());
        console.log(dates)
        console.log(date)
        date.setDate(date.getDate() + 1)
        console.log(date)
      }
      console.log(dates)
      return dates
    }
    getDateInRange(checkIn, checkOut)

    if(dates) {
      let lodging = await Lodging.findById(req.params.lodgingId)
      lodging.unavailableDate = dates
      lodging.save()
    }
    const newBooking = await Booking.create(req.body)
    newBooking.lodgingId = toId(req.body.lodgingId)
    const infoGuest= await Guest.find({email: req.body.email})
    console.log(infoGuest)
    let userId = ( infoGuest[0]._id)
    const lodging = await Lodging.findById(req.body.lodgingId)
    newBooking.costNight = lodging.price
    newBooking.totalPrice = (newBooking.costNight * newBooking.night)
    newBooking.guestId = userId
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
