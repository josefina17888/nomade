const express = require("express");
const router = express.Router();
const axios = require("axios");
const Conversation = require ("../../models/Conversation")
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

router.get("/:guestId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.guestId] },
      });
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
