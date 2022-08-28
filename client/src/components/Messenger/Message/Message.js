import React from 'react'
import s from './Message.css'

export default function Message({own}) {
  return (
    <div className={own ? "message own" :"message"}>
        <div className="messageTop">
            <img className="messageImg" src="https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" alt="user img"/>
        <p className="messageText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  </p>
        </div>
        <div className="messageBottom">Hace 1hora</div>
    </div>
  )
}
