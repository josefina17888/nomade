import React from "react";
import styles from "./Estadisticas.module.css";
import { VscPerson } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { IoHeartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {lodgingReviews, getGuests,getComplaints,getLodgings, getBookings} from "../../Redux/Actions/index";
import { Link,useHistory } from "react-router-dom";
import {deleteLodging} from "../../Redux/Actions/index";
import Doughnut from "./Charts/Doughnut"
export default function estadisticas() {
  const dispatch = useDispatch();
  const history = useHistory()
  useEffect(() => {
    dispatch(lodgingReviews());
    dispatch(getGuests());
    dispatch(getComplaints());
    dispatch(getLodgings());
    dispatch(getBookings());
  }, [dispatch]);
  let stateLodgings = useSelector((state) => state.allGuests)
  let allLodgingsReviews = useSelector((state) => state.allLodgingsReviews)
  let allcomplaints = useSelector((state) => state.allcomplaints)
  let allLodgings = useSelector((state) => state.allLodgings)
  let bookings = useSelector((state) => state.bookingsall)
  let paises = allLodgings.map(e=>e.country)
  let paisesRepetidos = new Set(paises);
  let paisesAlcanzados = [...paisesRepetidos];
  let mes = bookings.filter(e=>e.dated)
  let fechaActual = new Date()
  let fechaComparativa = fechaActual.getMonth()+ 1
  let fecha = mes.filter(e=>e.dated.split("-")[1]=== "0" +fechaComparativa )
  let plata = fecha.reduce((a,b)=> a + b.totalPrice, 0 )
  let promedio = plata/fecha.length
  let totalNochesReservadas = mes.reduce( (a,b) => a + b.allDates.length,0)
  let totalNochesDisponibles = allLodgings.length*30
  let ocupacion =((totalNochesReservadas/totalNochesDisponibles)*100).toFixed(2)
  return (
 
   <div>
    <div className={styles.tableEstadisticas}>
      <div className={styles.estadisticasUser}>
      <h2 className={styles.tableInterior}>Usuarios  </h2>
      <p className={styles.h2Interior}>{stateLodgings.filter(e=>e.Visibility === true).length}</p>
      </div>
      <div className={styles.estadisticasUser}>
      <h2 className={styles.tableInterior}>Administradores </h2>
      <p className={styles.h2Interior}>  {stateLodgings.filter(e=>e.isAdmin === true).length}</p>
      </div>
      <div className={styles.estadisticasUser}>
      <h2 className={styles.tableInterior}>Cantidad de reseñas  </h2>
      <p className={styles.h2Interior}>  {allLodgingsReviews.length}</p>
      </div>
      <div className={styles.estadisticasUser}>
      <h2 className={styles.tableInterior}>Reseñas de 5 estrellas </h2>
      <p className={styles.h2Interior}>   {allLodgingsReviews.filter(e=>e.rating === 5).length}</p>
      </div>
      <div className={styles.estadisticasUser}>
      <h2 className={styles.tableInterior}>Reseñas de 1/2 estrellas</h2>
      <p className={styles.h2Interior}>   {allLodgingsReviews.filter(e=>e.rating < 3).length} </p>
      </div>
      <div className={styles.estadisticasUser}>
      <h2 className={styles.tableInterior}>Denuncias activas</h2>
      <p className={styles.h2Interior}>   {allcomplaints.filter(e=>e.Visibility === true).length} </p>
      </div>
      <div className={styles.estadisticasUser}>
      <h2 className={styles.tableInterior}>Hospedajes activos</h2>
      <p className={styles.h2Interior}>  {allLodgings.filter(e=>e.Visibility === true).length}</p>
      </div>
      <div className={styles.estadisticasUser}>
      <h2 className={styles.tableInterior}>Paises alcanzados </h2>
      <p className={styles.h2Interior}>  {paisesAlcanzados.length}</p>
      </div>
      <div className={styles.estadisticasUser}>
      <h2  className={styles.tableInterior}> Noches por mes </h2>
      <p className={styles.h2Interior}>   {fecha.length}</p>
      </div>
      <div className={styles.estadisticasUser}>
      <h2  className={styles.tableInterior}>Ventas por mes  </h2>
      <p className={styles.h2Interior}>{plata}$</p>
      </div>
      <div className={styles.estadisticasUser}>
      <h2  className={styles.tableInterior}>Ingreso promedio por reserva</h2>
      <p className={styles.h2Interior}>   {promedio.toFixed(2)}$ </p>
      </div>
      <div className={styles.estadisticasUser}>
      <h2  className={styles.tableInterior}>Ocupación</h2>
      <p className={styles.h2Interior}>   {ocupacion}% </p>
      </div>
      <Doughnut ocupacion={ocupacion}/>

      </div>
     
      
</div>
  );
}