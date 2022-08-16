const express = require("express");
const router = express.Router();
const axios = require("axios");
const Guest = require("../../models/Guest");


router.post("/", async (req, res) => {
   
      res.status(200).json(savedHost);
 
      res.status(500).json(err);
   
  });

  
 module.exports = router;