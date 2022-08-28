import React from 'react'
import s from './Conversation.module.css'

export default function Conversation() {
  return (
    <div className={s.conversation}>
        <img className={s.convImg } src="https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" alt="Host's Profile Picture"/>
        <span className={s.convName}>Nombre Del host</span>
    </div>
  )
}
