import React from 'react'
import { IoHeartOutline } from "react-icons/io5";
import s from "./Favorite.module.css";

export default function Favorite() {
  return (
    <div>
        <button >
            <IoHeartOutline className={s.fav}/>
            </button>
        </div>
  )
}
