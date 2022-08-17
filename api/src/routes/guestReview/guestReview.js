const express = require("express");
const router = express.Router();
const axios = require("axios");
const guestReview = require("../../models/GuestReview");

router.post("/", async (req, res) => {
    let {rating, comments} = req.body;
    if (!rating || !comments){
        return res.status(400).send({message: 'Rating and comments are required'})
    }
    else if (rating < 1 || rating > 5){
        return res.status(400).send({message: 'Rating must be between 1 and 5'})
    }
    else { 
        try {
            const guestRevs = new guestReview(req.body);
            await guestRevs.save();
            return res.status(200).json(guestRevs);
        } catch (error){console.log(error)}
    }
  });

  
 module.exports = router;