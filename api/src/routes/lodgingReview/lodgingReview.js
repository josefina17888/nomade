const express = require("express");
const router = express.Router();
const axios = require("axios");
const lodgingReview = require("../../models/LodgingReview");

router.post("/", async (req, res) => {
    let {rating, comments} = req.body;
    if (!rating || !comments){
        return res.status(400).send({message: 'Rating and comments are required'})
    }
    else { 
        try {
            const lodgingRevs = new lodgingReview(req.body);
            await lodgingRevs.save();
            return res.status(200).json(lodgingRevs);
        } catch (error){console.log(error)}
    }
  });

  
 module.exports = router;