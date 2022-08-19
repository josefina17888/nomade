const express = require("express");
const router = express.Router();
const cors = require("cors")
const multer = require("multer")
const {addGuest,upDate,getGuest,deleteMessage} = require("./controller")
const Guest = require("../../models/Guest");
const Booking = require('../../models/Booking')

const upload = multer({
    dest:"public/files/uploads/images"
}); 



router.post("/", upload.single("picture") ,async (req, res) => {

    try{
      const newGuest = await Guest.create(req.body);
      newGuest.save();
      res.status(200).send(newGuest);
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


