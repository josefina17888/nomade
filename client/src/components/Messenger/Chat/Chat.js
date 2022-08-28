import React from "react";
import NavBar from '../../NavBar/NavBar';
import ResDetail from "../ResDetail/ResDetail";
import s from "./Chat.module.css";
import Conversation from '../Conversation/Conversation'
import Message from "../Message/Message";

export default function Chat() {
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
