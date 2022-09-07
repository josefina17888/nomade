import React from 'react'
import s from "./terminos.module.css"
import NavBar from "../NavBar/NavBar"

export default function Terminos(){
    return(
        <div>
            <NavBar />
        <div className={s.div}>
            <p className={s.p}>
            Queremos poner en conocimiento a los usuarios de que esta página fue creada con fines educacionales, 
            como proyecto final del Henry Bootcamp, y al momento está en entorno de prueba por lo que no ofrece 
            alojamientos o servicios reales. 
            </p>
            </div>
        </div>
    )
}