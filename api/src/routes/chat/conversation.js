const express = require("express");
const router = express.Router();
const axios = require("axios");
const Conversation = require("../../models/Conversation");
const Guest = require("../../models/Guest");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//NUEVA CONVERSACION

router.post("/", async (req, res) => {
  let senderEmail= req.body.senderEmail
  let receiverEmail= req.body.receiverEmail
  let sender= await Guest.findOne({ email: senderEmail })
  let senderId= sender._id
  let receiver= await Guest.findOne({ email: receiverEmail })
  let receiverId= receiver._id
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET CONVERSACION DE USUARIO

router.get("/conv/:userEmail", async (req, res) => {
  try {
    let userInfo = await Guest.findOne({ email: req.params.userEmail });
    console.log("userInfo", userInfo);
    let userId = userInfo._id;
    console.log("userID", userId);
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    console.log("convers", conversation);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get users para chat//  puede ser cualquiera de los dos usuarios, uno va por query y el otro por params

router.get("/users/:userEmail", async (req, res) => {
  const userEmail= req.params.userEmail
  try {
    let user= await Guest.findOne({ email: userEmail })
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/users/friend/:friendId", async (req, res) => {
  const friendId= req.params.friendId
  try {
    let user= await Guest.findOne({ _id: friendId })
    console.log(user)
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get current User

/* router.get("/users/:userEmail", async (req, res) => {
  const User
  const userId = toId(req.query.guestId);
  const username = req.query.username;
  try {
    let myUser = await Guest.findById({ _id: req.query.guestId });
    res.status(200).json(myUser);
  } catch (err) {
    res.status(500).json(err);
  }
}); */

module.exports = router;