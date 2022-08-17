const express = require("express");
const router = express.Router();
const axios = require("axios");
const Host = require("../models/Host");


router.post("/", async (req, res) => {
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