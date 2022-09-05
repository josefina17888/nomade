import React from "react";
import styles from "../Card/Card.module.css";
import { VscPerson } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { IoHeartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {lodgingReviews, getGuests,} from "../../Redux/Actions/index";
import { Link,useHistory } from "react-router-dom";
import {deleteLodging} from "../../Redux/Actions/index";
export default function CardComplaint({ id, tipo, descripcion, dated, visibility,guest, lodgingId }) {
  const dispatch = useDispatch();
  const history = useHistory()
  useEffect(() => {
    dispatch(lodgingReviews());
    dispatch(getGuests());
  }, [dispatch]);

  let guestId = localStorage.getItem("userInfo");
  if (!guestId) {
  } else {
    var userToken = JSON.parse(guestId)._id;
    var userEmail = JSON.parse(guestId).email;
    var admin = JSON.parse(guestId).isAdmin;
  }
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
 var arrpromedio =[]
 arrpromedio = arrpromedio.map(e=>e = promedio)
 
const allGuests = useSelector((state) => state.allGuests);
let arrFilter = allGuests.filter(e => e.email === userEmail)
let currentDate = new Date(dated)
  return (
 
   <div>
      { visibility === undefined ||visibility === true ? 
         <div className={styles.card}>
      <div>
        <div className={styles.icons}>
          <div className={styles.guests}> {tipo}</div>
      </div>
      <div className={styles.text}>
          <h3 className={styles.city}>{descripcion}</h3>
         
          <p className={styles.price}>{currentDate.toLocaleDateString()}</p>
          </div>
          <div className={styles.text}>
          <p className={styles.noche}>Lodging: {lodgingId}</p>
          </div>
          <div className={styles.text}>
          <p className={styles.noche}>guest: {guest}</p>
          </div> 
          
          </div>
          
    </div>:<div className={styles.nover}></div>
}

</div>
  );
}