import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Favorites.module.css";
import { IoClose } from "react-icons/io5";
import {
  addFavorite,
  getFavorites,
  deleteFavorite,
  getLodgings,
} from "../../Redux/Actions";
import FavoritesCard from "../FavoritesCard/FavoritesCard";



export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.userFavorites);
  let stateLodgings = useSelector((state) => state.lodgings);
  const guestInfo = localStorage.getItem("userInfo");
  let userEmail = JSON.parse(guestInfo).email;
  let userFavs = {
    userEmail,
  };
  
  useEffect(() => {
    dispatch(getLodgings());
    dispatch(getFavorites(userFavs));
  }, [dispatch]);

  let existIds = [];
  let favsIds = [];

  for (let i = 0; i < stateLodgings.length; i++) {
    existIds.push(stateLodgings[i]._id);
  }

  let filtrados = favorites.map(f=>stateLodgings.find(l=>l._id ===f.lodgingId));
  
   

  return (
    <div className={s.fgral}>
      <div className={s.ftitle}><h3>tus favoritos</h3></div>

      {filtrados.length !== 0 ? (
        filtrados.map((e) => { 
          return (
            <div className={s.columnCards}>

            
            <FavoritesCard filtrados={filtrados} userEmail= {userEmail} lodgingId={e._id} country={e.country} city={e.city} price={e.price} title={e.title} guests={e.guests} picture={e.picture} id={e._id}
           />
           
           </div>
          );
        })
      ) : (
        <div>NO HAY FAVORITOS PARA MOSTRAR</div>
      )}
    </div>
  );
}
