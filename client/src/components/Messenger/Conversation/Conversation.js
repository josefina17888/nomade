import React, { useEffect, useState } from "react";
import s from "./Conversation.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BsNutFill } from "react-icons/bs";

export default function Conversation({ conversation, currentUser }) {
  let dispatch = useDispatch();
  const [friend, setFriend] = useState({})
  const [sFriendId, setsFriendId] = useState(null);
  
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    setsFriendId(friendId);
    const getFriend = async () => {
      try {
        let friendInfo = await axios(
          "http://localhost:3001/api/conversation/users/friend/" + friendId
        );
        setFriend(friendInfo.data) 
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
          friend.picture 
          ? friend.picture
          : "https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png"}
        alt="Host's Profile Picture"
      />
       <span className={s.convName}>{friend.name}</span>  
    </div>
  );
}
