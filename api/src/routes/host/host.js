const express = require("express");
const router = express.Router();
const Guest = require("../../models/Guest")
const upload = require('../../../libs/storage.js')
const Host = require("../../models/Host");
const cloudinary = require("../../../libs/cloudinary")



/// postea el host 

router.post("/:email", upload.single("hostDniPicture"), async (req, res) => {
  const {dni} = req.body
  const {cbu} = req.body
  const filename = req.file
  const result = await cloudinary.uploader.upload(req.file.path)
  console.log(result)
  try {
    const guest = await Guest.findOne({email: req.params.email})
    const myHost = new Host()
    myHost.dni= req.body.dni
    myHost.hostDniPicture= result.url
    myHost.cbu = req.body.cbu
    myHost.guestId = guest._id
    await myHost.save()

    let hostId = myHost._id
        res.redirect(`http://localhost:3000/${hostId}/registerlodging`)
        // res.redirect(`https://nomade-khaki.vercel.app/${hostId}/registerlodging`)
        // res.status(200).json(myHost)

    } catch (error) {
        res.status(400).send('no se pudo guardar el Host')
        console.log(error)
    }
});


//Filtra por dni
router.get("/:dni", async (req, res) => {
  const dniSearch = req.params.dni;
  try {
      Host.find({ dni: dniSearch }, (err, dni) => {
        res.send(dni);
      });
  } catch (err) {
    res.json(err);
  }
});

//trae todos los host con la info completa de guest(funciona)//

//TRAE TODOS LOS HOSTS///
  router.get("/", async (req, res) => {
    Host.find({}, function (err, host) {
        res.status(200).send(host);
      });
    });
  ///MODICAR A HOST//

    router.patch("/:hostId", async (req, res) => {
      
          try {
        await Host.findByIdAndUpdate(req.params.hostId, req.body);
        res.send("actualizado con exito")
      } catch (error) {
        res.status(400).send("no se pudo actualizar el Host");
        console.log(error);
      }
    })


    // //BUSCAR UN HOST
    // router.get("/:idHost", async (req, res) => {
    //   try {
    //     const host = await Host.findOne({_id: req.params.idGuest})
    //     if(!host) return(400).send({message:"Could not find host"});
    //     res.status(200).send(host)
    //   }
    //   catch(error) {
    //     res.status(404).send(error)
    //   }
    
    // })

  module.exports = router;


