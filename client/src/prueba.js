import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import ResDetail from "../ResDetail/ResDetail";
import s from "./Chat.module.css";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";


export default function Chat() {
  const dispatch = useDispatch();
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState({});
  const [currentChat, setCurrentChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let userEmail = userInfo.email;

  useEffect(() => {
    socket.current = io("ws://localhost:3001");
    socket.current.on("getMessage", data =>{
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })

  }, []);
  console.log("user",user)
  console.log("socket",socket.current)
  console.log("arrival",arrivalMessage)

  useEffect(()=>{
    arrivalMessage && currentChat.members.includes(arrivalMessage.sender) &&
setMessages(prev=>[...prev, arrivalMessage ])
  },[arrivalMessage, currentChat])
  
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        let res = await axios.get(
          "http://localhost:3001/api/conversation/conv/" + userEmail
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userEmail]);

  useEffect(() => {
    const getUser = async () => {
      try {
        let userData = await axios(
          "http://localhost:3001/api/conversation/users/" + userEmail
        );
        setUser(userData.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [userEmail]);

  useEffect(() => {
    const getMessages = async () => {
      let conversationId = currentChat._id;
      try {
        let res = await axios(
          "http://localhost:3001/api/message/" + conversationId
        );
        setMessages(res.data);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);


  useEffect(() => {
    /* scrollRef.current?.scrollInToView({behavior:"smooth"}) */
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://localhost:3001/api/message",
        message
      );
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(currentChat.members);

  return (
    <div className={s.chatContainer}>
      <NavBar />
      <div className={s.chat}>
        <div className={s.chatMsj}>
          <div className={s.chatMsjWrapper}>Mensajes</div>
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation key={c._id} conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
        <div className={s.chatBox}>
          <div className={s.chatBoxWrapper}>
            {currentChat._id ? (
              <>
                <div className={s.chatBoxTop}>
                  {messages.map((e) => (
                    <div ref={scrollRef}>
                      <Message
                        key={e._id}
                        messages={e.text}
                        own={e.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className={s.chatBoxBottom}>
                  <input
                    type="text"
                    className={s.chatInput}
                    placeholder="Escribe aqui..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button className={s.chatSubmitBtn} onClick={handleSubmit}>
                    Enviar
                  </button>
                </div>
              </>
            ) : (
              <span className={s.noConv}>Selecciona un Chat</span>
            )}
          </div>
        </div>
        <div className={s.resDetail}>
          <div className={s.resDetailWrapper}>
            <ResDetail />
          </div>
        </div>
      </div>
    </div>
  );
}


////////////////////////////////////////////
/* CONVERSATION */

const express = require("express");
const router = express.Router();
const axios = require("axios");
const Conversation = require("../../models/Conversation");
const Guest = require("../../models/Guest");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;


//NUEVA CONVERSACION

router.post("/:senderId/:receiverId", async (req, res) => {

  const filtered= await Conversation.find({members: [req.params.senderId, req.params.receiverId]})
  console.log("filtered",filtered)
  if (!filtered.length){
    try{
      const newConversation = await Conversation.create({
        members: [req.params.senderId, req.params.receiverId]})
        console.log("NEW",newConversation)
        res.send(newConversation)

    }catch(err){
      res.status(500).json(err);
    }
  }else{
    res.status(500).json("err");
  }
  


  /* try {
    await newConversation.save(); 
    res.status(200).json(newConversation);
    console.log("saved",newConversation)
  } catch (err) {
    res.status(500).json(err);
  } */
});

/* router.post("/", async (req, res) => {
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
  }); */

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