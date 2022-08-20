import React from "react";
import styles from "./Card.module.css";

export default function Card({ city, country, guests, price, picture, description }) {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <img src={picture} alt="img not found" width="200px" height="250px" />
      </div>
      <div className={styles.container}>
        <div className={styles.text}>
          <h3>{`${city}, ${country}`}</h3>
          <h4>{price}</h4>
          <h4>Cantidad de huéspedes: {guests}</h4>
          <h4>Descripción: {description}</h4>
        </div>
      </div>
    </div>
  );
}