const express = require("express");
const router = express.Router();
const {addGuest,upDate,getGuest,deleteMessage} = require("./controller")
const Guest = require("../../models/Guest");
const Booking = require('../../models/Booking')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const upload = require("../../../libs/storage")
 

router.get("/", async(req,res) => {
    let {filterGuest} = req.query
    try {
        const guest = await getGuest(filterGuest)
        res.status(201).send(guest)
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

//obtiene todos los Guest

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

//Postea un nuevo Guest
router.post("/", upload.single("picture") ,async (req, res) => {
  const {username, name , lastname , email , cellPhone , dni , country, birthDate ,password} = req.body
  const {filename} = req.file
  console.log(filename)
    try{
      const newGuest = await addGuest(username, name , lastname , email , cellPhone , dni , country,  filename, birthDate,password)
      res.status(201).send(newGuest)
    }
      catch (error){
          res.status(404).send(error)
      }
});

router.post("/login", async(req, res)=>{
    try{
        const user= await Guest.findOne({email: req.body.email, password: req.body.password  })
        
        if(user) {
            const token = jwt.sign({
                email: req.body.email,
                password: req.body.password
            }, 'secret123')
            return res.json({ status: 'ok', user: token})
        } else {
            return res.json({ status: 'error', user: false})
        }

    }catch(err){
       res.status(500).json(err)
    }
})


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
