const express = require("express");
const router = express.Router();
const axios = require("axios");
const Conversation = require('../../models/Conversation')
const Guest = require ("../../models/Guest")
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;


//NUEVA CONVERSACION

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET CONVERSACION DE USUARIO

router.get("/:userId", async (req, res) => {
  console.log("hola")
  try {

    //let userInfo= await Guest.findOne({email:req.params.userEmail})
    //console.log("userInfo",userInfo)
    //let userId= (userInfo._id)
    //console.log("userID",userId)
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    console.log("convers", conversation)
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
  





  // get conv includes two userId
  
  router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] }
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
