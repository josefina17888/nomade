import React from "react";
import styles from "./Card.module.css";
import { VscPerson } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";

export default function Card({ city, country, guests, price, picture, currency }) {
  return (

    <div className={styles.card}>
      <div className={styles.img}>
        <img src={picture} alt="img not found" width="200px" height="250px" />
      </div>
        <div className={styles.text}>
          <h3>{`${city}, ${country}`}</h3>
          <p className={styles.price}>${`${price}  ${currency}`}</p>
          <p className={styles.noche}> noche </p>
          <br></br>
          <div className={styles.guests}><VscPerson className={styles.guestsIcon}/> {guests}</div>
          <div className={styles.rating}><IoIosStar className={styles.ratingIcon}/> 4,5</div>
          
      </div>
    </div>
  );
}
