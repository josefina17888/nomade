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
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.userFavorites);
  let stateLodgings = useSelector((state) => state.lodgings);
  

  const guestInfo = localStorage.getItem("userInfo");
  let userEmail = JSON.parse(guestInfo).email;

  let userFavs = {
    userEmail: userEmail,

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

  let filtrados = [];
   favorites.forEach((e) => {
    if (existIds.includes(e.lodgingId)) {
    filtrados.push(e);
    }
  }); 



 

  return (
    <div className={s.fcontGral}>
      <div className={s.ftitle}><h3>tus favoritos</h3></div>

      {filtrados.length !== 0 ? (
        filtrados.map((e) => { 
          return (
            <div>
             {/*   <Link to={`/detail/${e._id}`} >  */}
            <FavoritesCard filtrados={filtrados} userEamil= {userEmail} lodgingId={e._id} country={e.country} city={e.city} price={e.price} title={e.title} guests={e.guests} picture={e.picture}
           />
          {/*  </Link> */}
           </div>
          );
        })
      ) : (
        <div>NO HAY FAVORITOS PARA MOSTRAR</div>
      )}
    </div>
  );
}
