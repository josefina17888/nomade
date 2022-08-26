const express = require("express");
const router = express.Router();
const axios = require("axios");
const lodgingReview = require("../../models/LodgingReview");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const upload = require("../../../libs/storage")
router.post("/:guestId/:lodgingId" ,upload.single(), async (req, res) => {
    let {rating, comments} = req.body;
    console.log(req.body)
    console.log(comments)
    if (!rating || !comments){
        return res.status(400).send({message: 'Rating and comments are required'})
    }
    else if (rating < 1 || rating > 5){
        return res.status(400).send({message: 'Rating must be between 1 and 5'})
    }
    else { 
        try {
            let dated = new Date()
            const lodgingRevs = await lodgingReview.create(req.body);
            lodgingRevs.dated = dated
            lodgingRevs.guestId = toId(req.params.guestId);
            lodgingRevs.lodgingId = toId(req.params.lodgingId);
            lodgingRevs.save();
            //res.redirect("http://localhost:3000/detail/" + req.params.lodgingId)
            res.redirect("https://nomade-khaki.vercel.app/detail/" + req.params.lodgingId)
        } catch (error){console.log(error)}
    }
  });
  router.get("/", async (req, res) => {
    const citySearching = await req.query.city;
    reviewLodgings = await lodgingReview.find();
    console.log(reviewLodgings)
    try {
          res.send(reviewLodgings);  
    } catch (err) {
      res.json(err);
    }
  });
  
 module.exports = router;
