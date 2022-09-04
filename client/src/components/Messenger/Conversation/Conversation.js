import React, { useEffect, useState } from "react";
import s from "./Conversation.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


export default function Conversation({ conversation, currentUser }) {
  console.log("conversation", conversation)
  console.log("currentUser", currentUser)
  let dispatch = useDispatch();
  const [user, setUser]= useState({});
 
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    console.log("friendId", friendId)
    const getFriend = async () => {
      try {
        let res = await axios(
          "/api/conversation/users/friend/" + friendId
          );
            setUser(res.data) 
       
      } catch (err) {
        console.log(err);
      }
    };
    getFriend()   
  }, [currentUser, conversation]);

  return (
    <div className={s.conversation}>
    <img
        className={s.convImg}
        src={
          user!=={}
          ? user.picture
          : "https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png"}
        alt="Host's Profile Picture"
      />
       <span className={s.convName}>{user.name}</span> 
    </div>
  );
}