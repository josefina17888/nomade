const express = require("express");
const router = express.Router();
const axios = require("axios");
const Host = require("../models/GUest");


router.post("/", async (req, res) => {
   
      res.status(200).json(savedHost);
 
      res.status(500).json(err);
   
  });

  
 module.exports = router;