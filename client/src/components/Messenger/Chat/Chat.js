import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import ResDetail from "../ResDetail/ResDetail";
import s from "./Chat.module.css";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import { sendMessage } from "../../../Redux/Actions";

export default function Chat() {
  const dispatch = useDispatch();
  const lodging = useSelector((state) => state.detail);
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState({});
  const [currentChat, setCurrentChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [guest, setGuest] = useState("");
  const [host, setHost] = useState("");
  const scrollRef = useRef();
  const socket = useRef();
  const bookingInfo = localStorage.getItem("booking");
  const booking = JSON.parse(bookingInfo);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let userEmail = userInfo.email;

  console.log("CONVERSATIONS", conversations);
  console.log("bookingInfo", booking);

  console.log("host", host);

  /*   let prueba= new Set(...membrs.map(e => e));
  console.log("prueba",prueba)  */

  //conecta con el server y trae los mensajes
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

  /* dispatch(getAllTemperaments())
    .then(()=>setLoader(false)) */

  const getConversations = async () => {
    try {
      let res = await axios.get("/api/conversation/conv/" + userEmail);
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConversations();
  }, [userEmail]);

  //crea la nueva conversacion en la db
  const newConversation = async () => {
    let prueba = conversations.filter(
      (c) => c.members.includes(guest) && c.members.includes(host)
    );
    console.log("prueba", prueba);
    if (!prueba.length) {
      let conv = await axios.post(`/api/conversation/${guest}/${host}`);
    }
  };

  useEffect(() => {
    newConversation();
  }, [conversations]);

  //trae la info de current User
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

  //trae el guestId del host para gregarlo a la conversacion
  const hostId = booking.hostId;
  console.log("ID", hostId);
  useEffect(() => {
    const getHostGuestId = async () => {
      try {
        console.log("aqui");
        let res = await axios.get("/api/host/all/" + hostId);
        console.log("response", res.data);
        let hostGuestId = res.data[0].guestId._id;
        console.log("response222", hostGuestId);

        setHost(hostGuestId);
      } catch (err) {
        console.log(err);
      }
    };
    getHostGuestId();
  }, [host]);
  //trae la info del guest para poder agregarlo a la conversacion

  let guestEmail = booking.email;
  console.log("guest", guestEmail);
  useEffect(() => {
    console.log("soy useeffect");
    const getGuestInfo = async () => {
      try {
        let res = await axios.get("/api/guest/" + guestEmail);
        let guestId = res.data[0]._id;
        setGuest(guestId);
      } catch (err) {
        console.log(err);
      }
    };
    getGuestInfo();
  }, [guest]);

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

  //envia al back el usuario y trae los dos usuarios
  useEffect(() => {
    if (user._id !== null && user !== []) {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        console.log("users que viene del back", users);
      });
    }
  }, [user]);

  // trae todos los mensajes
  useEffect(() => {
    if (currentChat._id) {
      const getMessages = async () => {
        let conversationId = currentChat._id;
        console.log("CONViD", conversationId);
        try {
          let res = await axios("/api/message/" + conversationId);
          console.log("getmensajes res.data", res.data);
          setMessages(res.data);
          setNewMessage("");
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }
  }, [currentChat]);

  /* useEffect(() => {
    if( scrollRef.current){
      scrollRef.current.scrollInToView({behavior:"smooth"}) 
    }
 
  }, [messages]); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("AQUI1");
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    console.log("AQUI2");
    console.log("mensaje", message);

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    console.log("receiverId", receiverId);
    console.log("AQUI3");
   /*  socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    }); */
    console.log("AQUI4");
    dispatch(sendMessage(message))
    //const res = await axios.post("/api/message", message);
    console.log("AQUI5");
    /* console.log("el mensaje", res); */
    /*  setMessages([...messages, res.data]); */
  };
  console.log(currentChat.members);

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
