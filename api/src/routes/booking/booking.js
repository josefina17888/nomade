const express = require("express");
const router = express.Router();
const axios = require("axios");
const Host = require("../../models/Booking");

router.get('/', async(req, res) =>{
    res.send('Hola')
})


router.post("/", async (req, res) => {
   
      res.status(200).json(savedHost);
 
      res.status(500).json(err);
   
  });

  
 module.exports = router;