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
const {bookingConfirm, review} = require("../../../libs/sendEmail");
const generateToken = require("../../utils/generateToken");



//POST del nuevo booking de Guest
router.post("/", async (req, res) => {
  const filtered = await Booking.find({allDates:req.body.allDates, lodgingId:req.body.lodgingId})
  if(!filtered.length){
    try {
      let dated = new Date()
      const newBooking = await Booking.create(req.body);
      newBooking.lodgingId = toId(req.body.lodgingId);
      newBooking.hostId = toId(req.body.hostId);
      const infoGuest = await Guest.find({ email: req.body.email });
      let userId = infoGuest[0]._id;
      // newBooking.totalPrice = newBooking.costNight * newBooking.night;
      newBooking.dated = dated
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



router.get("/", async (req, res) => {
  
  let reservas = await Booking.find();
   try {
         res.send(reservas);  
   } catch (err) {
     res.json(err);
   }
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
      const booking = await Booking.findOne({code: req.body.code})
      if(booking.emailV === false){
          booking.emailV = true
          booking.save()
          const infoLoding = await Lodging.findOne({_id: req.body.lodgingId})
          const title = "Tu reserva se realizó con éxito"
          const title2 = "¿Cómo estuvo tu experiencia nómade? Déjanos tus comentarios"
          const infoBooking = req.body
          const url = `http://localhost:3000/lodgingreview/${userExist._id}/${infoLoding._id}`
          await bookingConfirm(userExist.email,"Reserva confirmada",title , infoLoding ,infoBooking)
          await review(userExist.email,"Deja tu reseña",title2 , infoLoding ,infoBooking,url)
          res.status(201).send("Verifica tu correo")
          
      } else {
         return  res.send("Correo de reserva ya enviado")
      }      
     
    }
      catch (error){
          res.status(404).send(error)
      }
});

//MODIFICA BOOKING A VISIBILITY FALSE
router.patch("/:_id", async (req, res) => {
      
  try {
    let bookingId = toId(req.params._id)
    await Booking.findByIdAndUpdate(bookingId, { visibility: 'false' }).exec();
    res.send("actualizado con exito")
  } catch (error) {
  res.status(400).send("no se pudo actualizar");
  console.log(error);
}
})



module.exports = router;
