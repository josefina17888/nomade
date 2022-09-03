const express = require("express");
const router = express.Router();
const axios = require("axios");
const Booking = require("../../models/Booking");
const Host = require("../../models/Host");
const Lodging = require("../../models/Lodging");
const Guest = require("../../models/Guest");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const Token = require("../../models/Token")
const {bookingConfirm} = require("../../../libs/sendEmail");
const generateToken = require("../../utils/generateToken");



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

//trae las reservas de un guest
router.get("/all/:guestId", async (req, res) => {
  Booking.find({ guestId: req.params.guestId }, (error, docs) => {
    res.send(docs);
  });
});

router.post("/emailVerified/:email",async (req, res) => {
  const {email} = req.params
    try{
      const userExist = await Guest.findOne({ email });
      const tokenExist = await Token.findOne({userId: userExist._id})
      console.log(tokenExist)
      if(tokenExist === null) {
        const token = new Token({
          userId: userExist._id,
          token: generateToken(userExist._id)
        })
        token.save()
      } else {
        return  res.send("Ya te envié el correo gil")
      }      
      const lodging = await Lodging.findOne({_id: req.body.lodgingId})
      const title = "Tu reserva se realizó con éxito"
      const msg = `Tu pago ha sido aprobado , tu estadia en ${lodging.title} te espera desde el ${new Date(req.body.checkIn).toLocaleDateString()} al ${new Date(req.body.checkOut).toLocaleDateString()} Ciudad: `
      await bookingConfirm(userExist.email,"Reserva confirmada",title , msg )
      res.status(201).send("Verifica tu correo")
    }
      catch (error){
          res.status(404).send(error)
      }
});


module.exports = router;
