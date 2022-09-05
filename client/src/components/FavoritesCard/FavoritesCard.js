import React from "react";
import s from "./FavoritesCard.module.css";
import { VscPerson } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, getFavorites, deleteFavorite } from "../../Redux/Actions";
import { Link } from "react-router-dom";

export default function FavoritesCard({
  filtrados,
  lodgingId,
  city,
  price,
  country,
  title,
  guests,
  picture,
  userEmail,
  id
}) {
  const dispatch = useDispatch();
  let favData = {
    userEmail: userEmail,
    lodgingId: lodgingId,
  };

  async function handleClick(e) {
    //getFavorites( favData)
    await dispatch(deleteFavorite(favData));
  }

  const obj = Object.assign({}, picture);
  const picture1 = obj["0"];

  return (
   
    <div className={s.fcontGral}>
       
        <button onClick={handleClick} className={s.closeBtn}>
          <IoClose />
        </button>
        <Link to={`/detail/${id}`} > 
      <div className={s.favcard}>
        <div className={s.fpicture}><img className={s.fimg} alt="" width="300px" src={picture1}/></div>
        <div className={s.ftext}>
          <div>{`${city}, ${country}`}</div>

          <p className={s.fprice}>${`${price}`}</p>
          <p className={s.fnoche}> noche </p>

          <div>{title}</div>
          <div className={s.fguests}><VscPerson className={s.fguestsIcon}/> {guests}</div>
        </div>
      </div>
      </Link>
    </div>
    
  );
}
