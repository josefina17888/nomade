const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const upload = require("../../../libs/storage")
 


const Host = require("../../models/Host");
=======
const axios = require("axios");
const Host = require("../../models/Host");
const Lodging = require("../../models/Lodging");
const mongoose = require ("mongoose")

const toId = mongoose.Types.ObjectId
>>>>>>> a7b588744de26d2b7d81a02807010419daa6d9af



/// postea el host 
router.post("/", async (req, res) => {
<<<<<<< HEAD
    const {name , lastname , email , cellPhone , dni ,country, birthDate, photo} = req.body
    try {
      const myHost = await new Host(req.body);
      myHost.save()
          res.status(200).json(myHost)
      } catch (error) {
          res.status(400).send('no se pudo guardar el Host')
          console.log(error)
      }
  
  });


  
=======
  const {name , lastname , email , cellPhone , dni ,country, birthDate, photo} = req.body
  try {
    const myHost = await new Host(req.body);
    myHost.save()
        res.status(200).json(myHost)
    } catch (error) {
        res.status(400).send('no se pudo guardar el Host')
        console.log(error)
    }

});

/// trae todos los lodgings de un host
router.get("/:hostId", async (req, res) => {
  Lodging.find({hostId: req.params.hostId}, (error,docs)=>{
>>>>>>> a7b588744de26d2b7d81a02807010419daa6d9af

      res.send(docs)
  })


})
  router.get("/", async (req, res) => {

    Host.find({}, function (err, host) {
        res.status(200).send(host);
      });
    });

  

  
module.exports = router;