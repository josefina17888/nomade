import React from "react";
import styles from "./Card.module.css";
import { VscPerson } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import Favorite from "../Favorite/Favorite";


export default function Card({ city, country, guests, price, picture, currency }) {
  return (

    <div className={styles.card}>
      <div className={styles.img}>
        <div>
        <img src={picture} alt="img not found" width="200px" height="250px" />
        </div>
        <div>
          <Favorite/>
          </div>
          <div className={styles.icons}>
          <div className={styles.guests}><VscPerson className={styles.guestsIcon}/> {guests}</div>
          <div className={styles.rating}><IoIosStar className={styles.ratingIcon}/> 4,5</div>
      </div>
      </div>
        <div className={styles.text}>
          </div>
          <h3 className={styles.city}>{`${city}, ${country}`}</h3>
          <p className={styles.price}>${`${price} ${currency}`}</p>
          <p className={styles.noche}> noche </p>
    </div>
  );
}
