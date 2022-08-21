const express = require("express");
const router = express.Router();
const upload = require("../../../libs/storage")
const Host = require("../../models/Host");
const Lodging = require("../../models/Lodging");
const mongoose = require ("mongoose")
const toId = mongoose.Types.ObjectId
const upload = require('../../../libs/storage.js')
const cloudinary = require('cloudinary')

cloudinary.config({ 
  cloud_name: 'dbq85fwfz', 
  api_key: '578434861277536', 
  api_secret: 'wtuN2zPkgy26qkfXvl03QhAxgxI' 
});

const upload = require('../../../libs/storage.js')


/// postea el host 


/// postea el host 



router.post("/:guestId", upload.single("hostDniPicture"), async (req, res) => {
  const {dni} = req.body
  const filename = req.file
  const result = await cloudinary.v2.uploader.upload(req.file.path)
  console.log(result)
  try {
    const myHost = new Host()
    myHost.dni= req.body.dni
    myHost.hostDniPicture= result.url
    myHost.guestId = toId(req.params.guestId);
    // if(filename) {
    //   myHost.setImgUrl(req.file.filename)
  // }

    await myHost.save()
        res.status(200).json(myHost)
    } catch (error) {
        res.status(400).send('no se pudo guardar el Host')
        console.log(error)
    }
});

//trae todos los host con la info completa de guest(funciona)//
router.get("/all", async (req, res) => { 
  const host = await Host.find({}).populate({path:"guestId", model: "Guest"})
  res.send(host) 
 }); 

/// trae todos los lodgings de un host
router.get("/:hostId", async (req, res) => {
  Lodging.find({hostId: req.params.hostId}, (error,docs)=>{

      res.send(docs)
  })
})

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


  module.exports = router;


