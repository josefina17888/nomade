import React, { useEffect, useState }  from 'react';
import { useLocation } from "react-router-dom"
import { getFeedback } from '../../Redux/Actions';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Status.module.css"
import NavBar from '../NavBar/NavBar';

export default function Status() {
    // const dispatch = useDispatch();
    const bookingData = useSelector((state) => state.postBooking);
    console.log(bookingData)
    
    const status = useLocation();
    const status1 = status.search
    const status2 = status1.split("&", 4);
    console.log(status2)
    const paymentId1 = status2[2].split("=")
    const paymentId = paymentId1[1]
    console.log(paymentId)
    const realStatus1 = status2[3].split("=")
    const realStatus = realStatus1[1]
    console.log(realStatus)

return (
<div className="_16grqhk">
      <NavBar />
    <div>
 {
    realStatus === "approved" ? 
    (<div className={styles.title}>Tu pago ha sido aprobado</div>) :
    (<div className={styles.title}>No se logró realizar tu pago</div>)
 }
        <div>
        <Link className={styles.link} to='/'>Volver a la página principal</Link>
        </div>
    </div>
</div>
)
}