import React from "react";
import styles from "./Card.module.css";
import { VscPerson } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { IoHeartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {lodgingReviews} from "../../Redux/Actions/index";
export default function Card({ city, country, guests, price, picture, currency, id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(lodgingReviews());
  }, [dispatch]);

  let stateLodgings = useSelector((state) => state.allLodgingsReviews); 
  let cantidad = stateLodgings.map(e=> e.lodgingId)
  let iguales = cantidad.map(e=> e === id)
  iguales = iguales.filter(e=> e === true)
  iguales = iguales.length
  let arrCuantos = (stateLodgings.map(e=> e.lodgingId === id? e.rating : false))
  let cuantos = 0;
  for(let i = 0; i<arrCuantos.length ; i++)
  {
    if(arrCuantos[i]!==false)
    {
        cuantos = cuantos + arrCuantos[i]
    }
  }

 var promedio = cuantos/iguales
 console.log(promedio)

  return (

    <div className={styles.card}>
      <div className={styles.img}>
        <div>
        <img src={picture} alt="img not found" width="200px" height="250px" />
        </div>
        <div><IoHeartOutline className={styles.fav}/></div>
          <div className={styles.icons}>
          <div className={styles.guests}><VscPerson className={styles.guestsIcon}/> {guests}</div>
          <div className={styles.rating}><IoIosStar className={styles.ratingIcon}/> { promedio > 0 && promedio < 6 ? promedio.toFixed(1): "n/c"}</div>
      </div>
      </div>
        <div className={styles.text}>
          <h3 className={styles.city}>{`${city}, ${country}`}</h3>
          <p className={styles.price}>${`${price} ${currency}`}</p>
          <p className={styles.noche}> noche </p>
          </div>
    </div>
  );
}
