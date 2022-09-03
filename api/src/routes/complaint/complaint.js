const express = require("express");
const router = express.Router();
const axios = require("axios");
const complaint = require("../../models/complaint");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const upload = require("../../../libs/storage")
router.post("/:guestId/:lodgingId",upload.single(), async (req, res) => {
    let {tipo, descripcion} = req.body;
        try {
            let dated = new Date()
            const denuncias = await complaint.create(req.body);
            denuncias.dated = dated
            denuncias.lodgingId = req.params.lodgingId;
            denuncias.guestId = req.params.guestId;
            denuncias.save();
            res.redirect("http://localhost:3000/detail/" + req.params.lodgingId)
        } catch (error){console.log(error)}
  });
router.get("/", async (req, res) => {
   let denuncias = await complaint.find();
    try {
          res.send(denuncias);  
    } catch (err) {
      res.json(err);
    }
  });
  
  
 module.exports = router;