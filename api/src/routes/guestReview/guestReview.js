const express = require("express");
const router = express.Router();
const axios = require("axios");
const guestReview = require("../../models/GuestReview");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

router.post("/:hostId/:guestId", async (req, res) => {
    let {rating, comments} = req.body;
    if (!rating || !comments){
        return res.status(400).send({message: 'Rating and comments are required'})
    }
    else if (rating < 1 || rating > 5){
        return res.status(400).send({message: 'Rating must be between 1 and 5'})
    }
    else { 
        try {
            const guestRevs = await guestReview.create(req.body);
            guestRevs.hostId = toId(req.params.hostId);
            guestRevs.guestId = toId(req.params.guestId);
            guestRevs.save();
            return res.status(200).json(guestRevs);
        } catch (error){console.log(error)}
    }
  });

  
 module.exports = router;