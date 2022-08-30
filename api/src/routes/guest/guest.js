const express = require("express");
const router = express.Router();
const Guest = require("../../models/Guest");
const Booking = require('../../models/Booking')
const upload = require("../../../libs/storage")
const cloudinary = require("cloudinary").v2;
const Token = require("../../models/Token")
const {verifyEmail} = require("../../../libs/sendEmail");
const generateToken = require("../../utils/generateToken");
require('dotenv').config();




cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



router.post("/", upload.single("picture") ,async (req, res) => {
  const { name , lastname , email , cellPhone , dni , country, birthDate ,password} = req.body
    try{
      const userExist = await Guest.findOne({ email });
      if(userExist) {
        res.send('Usuario ya existe')
      }
      const result = await cloudinary.uploader.upload(req.file.path)
      console.log(result)
      const newGuest = new Guest({ name , lastname , email , cellPhone , dni , country,  birthDate,password,  picture: result.secure_url})

      await newGuest.save()
      console.log(newGuest)
      const token = new Token({
        userId: newGuest._id,
        token: generateToken(newGuest._id)
      })
      console.log(token)
      token.save()
      console.log(token)
      const url = `${process.env.BASE_URL}api/guest/${newGuest._id}/verify/${token.token}`;
      console.log(url)
      const title = "Gracias por unirte a la comunidad Nómade"
      const msg = "Estas a unos pasos de poder disfrutar todos nuestros alojamientos Sólo da click al boton de abajo."
      await verifyEmail(newGuest.email,"Verify Email",title , msg , url)
      // res.status(201).send({message: "Revisa tu email para verificar tu cuenta"})
      res.status(201).redirect("http://localhost:3000/login")
    }
      catch (error){
          res.status(404).send(error)
      }
});



router.get("/:idGuest/verify/:token", async (req, res) => {
  console.log(req.params.token)
  console.log(req.params.idGuest)
  try {
    const guest = await Guest.findOne({_id: req.params.idGuest})
    console.log(guest)
    if(!guest) return(400).send({message:"Invalid link"});
    console.log("hola")
    const token = await Token.findOne({
      userId: guest._id,
      token: req.params.token
    });
    console.log(token)
    if(!token) return res.status(400).send({message: "invalid link"})
    console.log("hola2")
    await guest.updateOne({_id: guest._id, verified: true})
    console.log("hola3")
    await token.remove()
    // res.status(200).send({message: "Email verificado"})
    res.status(200).redirect(`http://localhost:3000/${req.params.idGuest}/verify/${req.params.token}`)
  }
  catch(error) {
    res.status(404).send(error)
  }

})



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
router.get("/:email", async(req,res) => {
  try {
    Guest.find({email: req.params.email},(error, guest)=>{
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

// router.patch("/:id", async (req, res) => {
//     const{id} = req.params
//     const {username, name , lastname , email , cellPhone , country,picture, birthDate} = req.body  
//     try{

//         const updateGuest = await upDate(id , req.body)
//         res.status(201).send("Actualizado con éxito")
//         }
//         catch (error){
//             res.status(404).send(error)
//         }    
// });


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