import React from 'react'
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { Link } from "react-router-dom";
import{useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import {getBookingByGuest} from '../../Redux/Actions'
import validate from "./validate";  
import style from "./LodgingReview.module.css";

export default function FormHost(props) {
  const dispatch = useDispatch()

//BUSCANDO EL LODGING POR PARAMS
    const params = useParams()
    const lodgingId = params.lodgingId;
    const userId = params.guestId
    const email = params.userEmail

    //BUSCANDO EL GUEST CON EL EMAIL y LOS BOOKINGS POR LODGING ID Y GUEST ID 
// + METIENDO LAS FECHAS DE CHECKOUT EN UN ARRAY y CHEQUEANDO SI EL DÍA DE HOY ES MENOR O IGUAL
  const [guest, setGuest] = useState("")
  const [booking, setBooking] = useState("")
  const [checkOuts, setCheckOuts] = useState("")


  // useEffect(() => {
  //   const getGuestInfo = async () => {
  //     try {
  //       let res = await axios.get("/api/guest/" + userId);
  //       let guestId = res.data[0]._id;
  //       setGuest(guestId)
       
  //       let response = await axios.get(`/api/booking/${lodgingId}/${guest}`);
  //       let guestBooking = response.data
  //       setBooking(guestBooking)
        
  //       let checkOut = []
  //       await guestBooking.forEach((e) => {
  //         let checkOutDay = e.checkOut
  //         checkOut.push(checkOutDay)
  //       })
  //       setCheckOuts(checkOut)

  //     } catch (err) {
  //       console.log(err);
  //     }
  //     };
  //   getGuestInfo();
  // }, [guest]);

  

  // console.log(checkOuts)

  // let validReviews = []

  // for (let i = 0; i < checkOuts.length; i++){
  //   if (new Date(checkOuts[i]) <= new Date())
  //   validReviews.push(checkOuts[i])
  // }
  // console.log(validReviews)


  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    rating: "",
    comments: "",})

  function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value,
    })
    setErrors(validate({
       ...input,
       [e.target.name] : e.target.value
  }))
  }



  return (
    <div className={style.contenedor}>
      <form action={`http://localhost:3001/api/LodgingReview/${userId}/${lodgingId}/`} method="POST" encType="multipart/form-data">
      {/* <form action= {`${process.env.REACT_APP_API}/api/LodgingReview/${guestId}/${props.match.params.lodgingId}/`}  method="POST" encType="multipart/form-data" >   */}
          <h3 className={style.h3}>Puntaje del hospedaje</h3>
        <p className={style.clasificacion}>
        <input id="radio1" onChange={handleChange} className={style.radio} type="radio" name ="rating" value="5"/><label className={style.label} for="radio1">★</label>
        <input id="radio2" onChange={handleChange} className={style.radio} type="radio" name ="rating" value="4"/><label className={style.label} for="radio2">★</label>
        <input id="radio3" onChange={handleChange} className={style.radio} type="radio" name ="rating" value="3"/><label className={style.label} for="radio3">★</label>
        <input id="radio4" onChange={handleChange} className={style.radio} type="radio" name ="rating" value="2"/><label className={style.label} for="radio4">★</label>
        <input id="radio5" onChange={handleChange} className={style.radio} type="radio" name ="rating" value="1"/><label className={style.label} for="radio5">★</label>
         </p>
          <p className={style.contenedor}>{errors.rating}</p>
        <h3 className={style.h3}>Comentarios</h3>
        <div className={style.contenedor}>
        <textarea
        name ="comments"
        className={style.contenedor}
        onChange={handleChange}
        value={input.comments}
        required
        /></div>
        <p className={style.contenedor}>{errors.comments}</p>
        {Object.entries(errors).length === 0 && input.comments !== ""?
          <div className={style.contenedor}>
          <button  type="submit" className={style.btn}>
           Reseñar
          </button></div>:<div className={style.contenedor}>
          <button  disabled  type="submit" className={style.btn}>
            Reseñar
          </button>
          
     </div>
     
     }
     <div className={style.contenedor}><Link to=  {"/detail/" +props.match.params.lodgingId}>
          <button className={style.button}>Volver</button>
        </Link></div>
        </form> 
    </div>
  )
}