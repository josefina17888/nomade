import React from 'react'
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { Link } from "react-router-dom";
import{useDispatch, useSelector} from 'react-redux'
import axios from 'axios'; 
import styles from "../CardDetail.module.css"

export default function ConditionalReview({lodId, email, userToken1}) {
  const dispatch = useDispatch()

//BUSCANDO EL LODGING y EL EMAIL POR PROPS
    const lodgingId = lodId;
    let userEmail = email;
    let userToken = userToken1;

//BUSCANDO EL GUEST CON EL EMAIL y LOS BOOKINGS POR LODGING ID Y GUEST ID 
// + METIENDO LAS FECHAS DE CHECKOUT EN UN ARRAY y CHEQUEANDO SI EL DÍA DE HOY ES MENOR O IGUAL
  const [guest, setGuest] = useState("")
  const [booking, setBooking] = useState("")
  const [checkOuts, setCheckOuts] = useState("")


  useEffect(() => {
    const getGuestInfo = async () => {
      try {
        let res = await axios.get("/api/guest/" + userEmail);
        let guestId = res.data[0]._id;
        setGuest(guestId)
       
        let response = await axios.get(`/api/booking/${lodgingId}/${guest}`);
        let guestBooking = response.data
        setBooking(guestBooking)
        
        let checkOut = []
        await guestBooking.forEach((e) => {
          let checkOutDay = e.checkOut
          checkOut.push(checkOutDay)
        })
        setCheckOuts(checkOut)

      } catch (err) {
        console.log(err);
      }
      };
    getGuestInfo();
  }, [guest]);

  console.log(checkOuts)

  let validReviews = []

  for (let i = 0; i < checkOuts.length; i++){
    if (new Date(checkOuts[i]) <= new Date())
    validReviews.push(checkOuts[i])
  }
  console.log(validReviews)

  return(
    <div>
    { validReviews.length ?
        <Link
          to={
            userToken
              ? `/lodgingreview/${guest}/${lodgingId}`
              : "/login"
          }
          className="nav-link py-2 px-0 px-lg-2"
        >
          <button className={styles.button}>¡Califica este hospedaje!</button>
        </Link>
        :
        <div>
        </div>}
        </div>

  )

}

