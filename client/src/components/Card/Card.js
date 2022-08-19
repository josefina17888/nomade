import React from "react";

export default function Card ({ lodgingType, guests, description }) {
    return (
        <div>
            <div>
            <h3>{lodgingType.toUpperCase()}</h3>
            <h4>Cantidad de huéspedes: {guests}</h4>
            <h3>Descripción: {description}</h3>
            </div>
        </div>
    )
}