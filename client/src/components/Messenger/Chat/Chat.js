import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import ResDetail from "../ResDetail/ResDetail";
import ResDetailHost from "../ResDetailHost/ResDetailHost";
import s from "./Chat.module.css";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";

export default function Chat() {
  const ENDPOINT =
    /* "ws://localhost:3001" */ "https://nomade-henry.herokuapp.com/";
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [host, setHost] = useState("");
  const [onlineUsers, setOnlineUsers] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [bookingInfo, setBookingInfo] = useState("");
  const scrollRef = useRef();
  const socket = useRef();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  let userId = user._id;
  let userEmail = user.email;

  //conecta con el server y trae los mensajes

  useEffect(() => {
    socket.current = io(ENDPOINT, {
      transports: ["websocket"],
    });
  }, [ENDPOINT]);



  if (localStorage.booking) {
    const bookingInfo = JSON.parse(localStorage.getItem("booking"));
    let hostId = bookingInfo.hostId;
    useEffect(() => {
      setBookingInfo(bookingInfo);
      const getHostGuestId = async () => {
        try {
          let res = await axios.get("/api/conversation/host/" + hostId);
          let hostGuestId = res.data;
          setHost(hostGuestId);
        } catch (err) {
          console.log(err);
        }
      };
      getHostGuestId();
    }, []);

    useEffect(() => {
      const newConversation = async () => {
        let filtered = conversations.filter(
          (c) => c.members.includes(userId) && c.members.includes(host)
        );
        if (!filtered.length) {
          let conv = await axios.post(
            "/api/conversation/" + userId + "/" + host
          );
        }
      };
      newConversation();
    }, [conversations]);
  }

 
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [messages]);

  //mensajes entrantes
  useEffect(() => {
    if (arrivalMessage !== null) {
      if (Object.keys(currentChat).length !== 0) {
        if (currentChat.members.includes(arrivalMessage.sender)) {
          setMessages((prev) => [...prev, arrivalMessage]);
        }
      }
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (userId) {
      socket.current.emit("addUser", userId);
    }
    socket.current.on("getUsers", (users) => {
      console.log("users del back", users);
    });
  }, [conversations]);

  // obtiene todas las conversaciones asociadas al usuario

  
  useEffect(() => {
    const getConversations = async () => {
      try {
        let res = await axios.get("/api/conversation/conv/" + userId);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
      getConversations();
 
  }, [userId, host]);

 

  // trae todos los mensajes de una conversacion
  useEffect(() => {
    if (currentChat._id) {
      const getMessages = async () => {
        let conversationId = currentChat._id;
        try {
          let res = await axios("/api/message/" + conversationId);
          setMessages(res.data);
          setNewMessage("");
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }
  }, [currentChat]);
  /* 
   useEffect(() => {
    if( scrollRef.current){
      scrollRef.current.scrollInToView({behavior:"smooth"}) 
    }
 
  }, [messages]); */

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
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

  return (
    <div className={s.chatContainer}>
      <div className={s.navContainer}>
        <NavBar />
      </div>
      <div className={s.chat}>
        <div className={s.convWrapper}>
          <div className={s.msjs}>
            <span>Tus mensajes</span>
          </div>
          <div className={s.conversation}>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation key={c._id} conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>

        <div className={s.chatBox}>
          <div className={s.chatBoxWrapper}>
            <div className={s.chatBoxTop}>
              <span>Acuerda los Detalles de Tu Estadia</span>
            </div>
            <div className={s.chatBoxCenter}>
              {currentChat._id ? (
                <>
                  <div className={s.chatBoxT}>
                    {messages.map((e) => (
                      <div ref={scrollRef}>
                        <Message
                          key={e._id}
                          messages={e.text}
                          own={e.sender === userId}
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
                <div className={s.noConv}><span >Selecciona una Conversacion</span></div>
                
              )}
            </div>
          </div>
        </div>

        <div className={s.resDetailWrapper}>
          <div className={s.resD}>
            <span>Detalles de tu reserva</span>
          </div>

          <div ref={scrollRef} className={s.reserv}>
            {localStorage.booking?(<ResDetail bookingInfo={bookingInfo} />):(<ResDetailHost currentUser/>)}
            
          </div>
        </div>
      </div>
    </div>
  );
}
