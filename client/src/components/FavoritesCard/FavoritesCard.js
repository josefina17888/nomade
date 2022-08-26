import React from 'react'
import s from './FavoritesCard.module.css'
import {IoClose } from "react-icons/io5";
import { useDispatch, useSelector} from "react-redux"
import { addFavorite, getFavorites, deleteFavorite } from '../../Redux/Actions'


export default function FavoritesCard({filtrados, lodgingId, city , price, country, title, guests,picture, userEmail}) {
  const dispatch= useDispatch()
  let favData={
    userEmail: userEmail,
    lodgingId: lodgingId,
  }

  async function handleClick(e){
    //getFavorites( favData)
    await dispatch(deleteFavorite(favData))

  }

  return (
    <div>
  

    <div className={s.favcard}>
    <button onClick={handleClick} className={s.closeBtn}><IoClose/></button>
    <div className={s.fpicture}>{picture}</div>
    <div className={s.ftext}>
    <div>{`${city}, ${country}`}</div>
    
    
    <p className={ s.fprice }>${`${ price }`}</p>
    <p className={ s.fnoche }> noche </p>
   
    <div>{title}</div>
    <div>{guests}</div>
    </div>

    </div>
  





    </div>
  
    
  )
}
