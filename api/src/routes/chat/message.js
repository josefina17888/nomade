const express = require("express");
const router = express.Router();
const axios = require("axios");
const Message = require ("../../models/Message")
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//POST MENSAJE
router.post('/', async (req,res)=>{
 console.log("back1")
    console.log(req.body)
    try{
      console.log("back2")
        const newMessage = await Message.create(req.body)
        console.log(newMessage)
        console.log("back3")
        newMessage.conversationId= req.body.conversationId
        newMessage.sender= req.body.sender
        newMessage.text= req.body.text
        newMessage.save()
        console.log()
        res.status(200).json(newMessage)
    }catch(err){
        res.status(500).json(err)
    }

})
//GET MENSAJE 
router.get("/:conversationId", async (req, res) => {
  let conversationId = req.params.conversationId
    try {
      const messages = await Message.find({
        conversationId 
      }); 
      res.status(200).json(messages);

    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;