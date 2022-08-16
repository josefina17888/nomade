const express = require("express");
const router = express.Router();
const axios = require("axios");
const Lodging = require("../../models/Lodging");


router.post("/", async (req, res) => {
   
    try{

        //crear nuevo usuario
        const newLodging = new Lodging({
            type:req.body.type,
            city:req.body.city,
            country:req.body.country,
    
        });
        // guardar usuario  y respuesta
        const lodging = await newLodging.save()
        res.status(200).json(lodging)
    }catch(err){
        res.status(500).json(err)
    }  
   
  });

  
 module.exports = router;