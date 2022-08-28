const express = require("express");
const router = express.Router();
const axios = require("axios");
const Message = require ("../../models/Message")
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//POST MENSAJE
router.post('/', async (req,res)=>{
    const newMessage= new Message(req.body)

    try{
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    }catch(err){
        res.status(500).json(err)
    }

})
//GET MENSAJE 
router.get("/:conversationId", async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;
