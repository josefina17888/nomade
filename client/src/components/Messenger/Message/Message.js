import React from 'react'
import s from './Message.css'
import {format} from 'timeago.js'


export default function Message({messages, own}) {

  return (
    <div className={own ? "message own" :"message"}>
        <div className="messageTop">
            <img className="messageImg" src="https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" alt="user img"/>
        <p className="messageText">{messages}</p>
        </div>
        <div className="messageBottom"> {messages.createdAt} </div>
    </div>
  )
}
