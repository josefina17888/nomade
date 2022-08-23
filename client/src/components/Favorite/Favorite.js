import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import s from "./Favorite.module.css";
import { useDispatch, useSelector} from "react-redux"
import { addFavorite, getLodgings} from '../../Redux/Actions';

export default function Favorite(props) {
/*   const dispatch= useDispatch()
  let stateLodgings = useSelector((state) => state.lodgings);
  
  const [favs, setFavs] = useState({
   userFrom: props.userFrom,
    lodgingId:props._id,
    picture:props.lodgingInfo.picture,
    title:props.lodgingInfo.title,
    guests: props.lodgingInfo.guests,
    rooms: props.lodgingInfo.rooms,
    beds: props.lodgingInfo.beds,
    currency: props.lodgingInfo.currency,
    city: props.lodgingInfo.city,
    country: props.lodgingInfo.country 

  }) 


  useEffect(() => {
    dispatch(getLodgings());
  }, []);

  function handleClick(e){
    e.preventDefault();
    dispatch(addFavorite(favs))
  }

  return (
    <div className={s.contFav}>
        <button className={s.favButton}>
            <FaHeart className={s.fav}/>
            </button>
        </div>
  ) */
}
