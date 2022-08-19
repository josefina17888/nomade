import React from "react";
import styles from "./Card.module.css"

export default function Card ({ lodgingType, guests, description, picture }) {
    return (
        <div className={styles.card}>
            <div>
            <img src= {picture} alt="img not found" width="200px" height="250px" />   
            </div>
            <div className={styles.container}>
            <div className={styles.text}>
            <h3>{lodgingType.toUpperCase()}</h3>
            <h4>Cantidad de huéspedes: {guests}</h4>
            <h3>Descripción: {description}</h3>
            </div>
            </div>
        </div>
    )
}