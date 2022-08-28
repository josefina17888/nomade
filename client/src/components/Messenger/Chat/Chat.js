import React, { useEffect, useState } from "react";
import NavBar from '../../NavBar/NavBar';
import ResDetail from "../ResDetail/ResDetail";
import s from "./Chat.module.css";
import Conversation from '../Conversation/Conversation'
import Message from "../Message/Message";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Chat() {
  const dispatch = useDispatch()
  const [conversations, setConversations]=useState([]);
  const user=JSON.parse(localStorage.getItem("userInfo"))
  console.log(user.email)

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversation/" + user.email);
        console.log("RES",res);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
  return (
    <>
      <NavBar />
      <div className={s.chat}>
        <div className={s.chatMsj}>
          <div className={s.chatMsjWrapper}>Mensajes</div>
          <Conversation/>
        </div>
        <div className={s.chatBox}>
          <div className={s.chatBoxWrapper}>

            <div className={s.chatBoxTop} >
             <Message/>
             <Message own= {true}/>
             <Message/>
            </div>
            <div className={s.chatBoxBottom} >
              <textarea className={s.chatInput} placeholder="Escribe aqui..."></textarea>
              <button className={s.chatSubmitBtn}>Enviar</button>
            </div>
          </div>
        </div>
        <div className={s.resDetail}>
          <div className={s.resDetailWrapper}><ResDetail/></div>
        </div>
      </div>
    </>
  );
}
