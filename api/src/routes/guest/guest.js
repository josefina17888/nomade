const express = require("express");
const router = express.Router();
const {upDate,getGuest,deleteMessage} = require("./controller")
const Guest = require("../../models/Guest");
const Booking = require('../../models/Booking')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const upload = require("../../../libs/storage")
const Model = require("../../models/Guest");
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: 'dbq85fwfz', 
  api_key: '578434861277536', 
  api_secret: 'wtuN2zPkgy26qkfXvl03QhAxgxI' 
});


router.post("/", upload.single("picture") ,async (req, res) => {
  
    try{
      const userExist = await Guest.findOne({ email });
      if(userExist) {
        res.send('Usuario ya existe')
      }
      const result = await cloudinary.uploader.upload(req.file.path)
      const newGuest = Guest.create({username, name , lastname , email , cellPhone , dni , country,  birthDate,password,  picture: result.secure_url})
      await newGuest.save()
      res.redirect("http://localhost:3000/");
    }
      catch (error){
          res.status(404).send(error)
      }
});

//Filtra por email
router.get("/", async (req, res) => {
  const emailSearch = req.query.email;
  allGuest = await Guest.find();
  try {
    if (emailSearch) {
      Guest.find({ email: emailSearch }, (err, email) => {
        res.send(email);
      });
    } else {
      res.json(allGuest);
    }
  } catch (err) {
    res.json(err);
  }
});
 
////TRAE TODOS LOS GUEST (FUNCIONA)////
router.get("/", async (req, res) => {
  try {
    Guest.find({}, function (err, guest) {
      console.log(guest)
      res.status(200).send(guest);
    });
  } catch (error) {
    res.status(400).send('Guests not found')
        console.log(error)
  }
});



//Trae un guest en particular
router.get("/:_id", async(req,res) => {
  try {
    Guest.find({_id: req.params._id},(error, guest)=>{
          res.json(guest)
      })
  }
  catch(error) {
      res.status(500).send(error)
  }
})



//Obtiene todas las reservaciones de un Guest
router.get("/:guestId/bookings", async(req,res) => {
    try {
        Booking.find({guestId: req.params.guestId},(error, bookings)=>{
            res.json(bookings)
        })
    }
    catch(error) {
        res.status(500).send(error)
    }
})



//Postea un nuevo Guest
router.post("/", upload.single("picture") ,async (req, res) => {
    try{
      const newGuest = await Guest.create(req.body)
      res.status(201).send(newGuest)
    }
      catch (error){
          res.status(404).send(error)
      }
});




router.get("/", async (req, res) => {
    try {
      Guest.find({}, function (err, guest) {
        res.status(200).send(guest);
      });
    } catch (error) {
      res.status(400).send('Guests not found')
          console.log(error)
    }
  });

router.patch("/:id", async (req, res) => {
    const{id} = req.params
    const {username, name , lastname , email , cellPhone , country,picture, birthDate} = req.body  
    try{

        const updateGuest = await upDate(id , req.body)
        res.status(201).send("Actualizado con éxito")
        }
        catch (error){
            res.status(404).send(error)
        }    
});


///ACTUALIZA EL GUEST (FUNCIONA)////
router.patch("/:guestId", async (req, res) => {
  try {
await Guest.findByIdAndUpdate(req.params.guestId, req.body);
res.send("actualizado con exito")
} catch (error) {
res.status(400).send("no se pudo actualizar el Guest");
console.log(error);
}
})


//Esta ruta es probable que no se considere en el Back y se modifique por Borrado Lógico
router.delete("/:id", async (req,res) => {
    const {id} = req.params
    try{
    await deleteMessage(id)
    res.status(200).send(`Usuario: ${id} eliminado `)
    }
    catch (error){
        res.status(404).send(error)
    }
})


module.exports = router
