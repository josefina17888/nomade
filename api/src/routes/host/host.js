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
  
  
  module.exports = router;