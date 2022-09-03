import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import ResDetail from "../ResDetail/ResDetail";
import axios from "axios";
import s from "./Chat.module.css";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import io from "socket.io-client";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  let userId = user._id;
  console.log(userId)

  useEffect(() => {
    socket.current = io("ws://localhost:3001");
    socket.current.on("getMessage", (data) => {
   
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  
  useEffect(() => {
    if (arrivalMessage !== null) {
      if (Object.keys(currentChat).length !== 0) {
        if (currentChat.members.includes(arrivalMessage.sender)) {
          setMessages((prev) => [...prev, arrivalMessage]);
        }
      }
    }
  }, [arrivalMessage, currentChat]);

  //envia al back el usuario y trae los dos usuarios
  useEffect(() => {
    if (user._id !== null) {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        console.log("users que viene del back", users);
      });
    }
  }, [user]);

  // obtiene todas las conversaciones asociadas al usuario
  const getConversations = async () => {
    try {
      let res = await axios.get("/api/conversation/conv/" + userId);
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConversations();
  }, [userId]);

  // trae todos los mensajes de una conversacion
  useEffect(() => {
    if (currentChat._id) {
      const getMessages = async () => {
        let conversationId = currentChat._id;
        try {
          let res = await axios("/api/message/" + conversationId);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //este objeto es el que va a la DB
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find((member) => member !== userId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      //envia el mensaje a la db
      const res = await axios.post("/api/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };


  /* useEffect(() => {
    if( scrollRef.current){
      scrollRef.current.scrollInToView({behavior:"smooth"}) 
    }

  }, [messages]); */

  return (
    <div className={s.chatContainer}>
      <NavBar />
      <div className={s.chat}>
        <div className={s.chatMsjWrapper}>Tus Mensajes</div>
        <div className={s.chatMsj}>
          <div className={s.chatMsjBottom}>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation key={c._id} conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
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
