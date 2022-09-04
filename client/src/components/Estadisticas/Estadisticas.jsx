import React from "react";
import styles from "../Card/Card.module.css";
import { VscPerson } from "react-icons/vsc";
import { IoIosStar } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { IoHeartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {lodgingReviews, getGuests,getComplaints,getLodgings, getBookings} from "../../Redux/Actions/index";
import { Link,useHistory } from "react-router-dom";
import {deleteLodging} from "../../Redux/Actions/index";
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
  return (
 
   <div>
      <h2>Usuarios: {stateLodgings.filter(e=>e.Visibility === true).length} </h2>
      <h2>administradores: {stateLodgings.filter(e=>e.isAdmin === true).length} </h2>
      <h2>cantidad de reseñas: {allLodgingsReviews.length} </h2>
      <h2>cantidad de reseñas con 5 estrellas: {allLodgingsReviews.filter(e=>e.rating === 5).length} </h2>
      <h2>cantidad de reseñas con menos de 2 estrellas: {allLodgingsReviews.filter(e=>e.rating < 3).length} </h2>
      <h2>cantidad de denuncias activas: {allcomplaints.filter(e=>e.Visibility === true).length} </h2>
      <h2>Publicaciones de hospedajes activas: {allLodgings.filter(e=>e.Visibility === true).length} </h2>
      <h2>Cantidad de paises alcanzados: {paisesAlcanzados.length} </h2>
      <h2>Reservas por mes: {fecha.length} </h2>
      <h2>Ventas por mes: {plata}$ </h2>
      <h2>Ingreso promedio por reserva: {promedio}$ </h2>
</div>
  );
}