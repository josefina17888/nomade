const express = require("express");
const router = express.Router();
const axios = require("axios");
const Host = require("../models/Host");
const upload = require("../../libs/storage")
const multer = require('multer')



router.post("/", upload.single('photo'), async (req, res) => {
  const {name , lastname , email , cellPhone , dni ,country, birthDate} = req.body
  const {filename} = req.file
  
  const myHost = new Host(req.body);
  if(filename){
    myHost.setImgUrl(filename)
  }
  try {
    await myHost.save()
    res.status(200).json(myHost)
    } catch (error) {
        res.status(400).send('no se pudo guardar el Host')
        console.log(error)
    }

});

router.put("/:id", async (req, res) => {
  const { name, lastname, email, cellPhone, country, photo } = req.body;

  try {
    await Host.findByIdAndUpdate(req.params.id, req.body);
    res.send('Actualizado con exito')
  } catch (error) {
    res.status(400).send("no se pudo actualizar el Host");
    console.log(error);
  }
})

router.get("/", async (req,res)=>{
  let search= {}
  if(req.body.name){
    search = { name: req.body.name };
  }
  try {
    Host.find(search, function(err, hosts){
      if(err){
        res.status(400).res.send('error en el get')
      }
      console.log('get de todos los hosts')
      res.json(hosts)
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;