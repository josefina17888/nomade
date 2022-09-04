const express = require("express");
const router = express.Router();
const axios = require("axios");
const Conversation = require("../../models/Conversation");
const Host = require("../../models/Host");
const Guest = require("../../models/Guest");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//NUEVA CONVERSACION


router.post("/:senderId/:receiverId", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.params.senderId, req.params.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* router.post("/:senderId/:receiverId", async (req, res) => {
  const filtered = await Conversation.find({
    members: [req.params.senderId, req.params.receiverId],
  });
  console.log("filtered", filtered);
  if (!filtered.length) {
    try {
      const newConversation = await Conversation.create({
        members: [req.params.senderId, req.params.receiverId],
      });
      console.log("NEW", newConversation);
      res.send(newConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("err");
  }

 
}); */
router.get("/host/:hostId", async (req, res) => { 
  console.log("entre")
  const host = await Host.find({_id:req.params.hostId}).populate({path:"guestId", model: "Guest"})
  console.log("el host encontrado",host)
/* let hostGuestId= host[0].guestId._id */
  res.send( host) 
 });



//GET CONVERSACION DE USUARIO

router.get("/conv/:userId", async (req, res) => {
  try {
    
    let userId = req.params.userId;
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
  const userEmail = req.params.userEmail;
  try {
    let user = await Guest.findOne({ email: userEmail });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
/// esta es para buscar al usuario desde el componente de conversations
router.get("/users/friend/:friendId", async (req, res) => {
  const friendId = req.params.friendId;
  try {
    let user = await Guest.findOne({ _id: friendId });
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
