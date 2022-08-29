import React from 'react'
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { Link } from "react-router-dom";
import{useDispatch, useSelector} from 'react-redux'
import { postHost } from "../../Redux/Actions";
//import estilos from './FormHost.module.css'
import {getGuest} from '../../Redux/Actions'
import validate from "./validate";  
import style from "./LodgingReview.module.css";
export default function FormHost(props) {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    rating: "",
    comments: "",})
  let guestId = localStorage.getItem("userInfo")
  guestId = JSON.parse(guestId)._id
  
const guestInfo = useSelector((state)=>state.guest)
useEffect(() => {
  dispatch(getGuest(guestId))
  
},[dispatch])

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
// function handleSubmit(e){
//   e.preventDefault()
//   history.push('/form')
//   alert("host creado")
//  }


  return (
    <div className={style.contenedor}>
      <form action={`http://localhost:3001/api/LodgingReview/${guestId}/${props.match.params.lodgingId}/`} method="POST" encType="multipart/form-data">
      {/* <form action= {`${process.env.REACT_APP_API}/api/LodgingReview/${guestId}/${props.match.params.lodgingId}/`}  method="POST" encType="multipart/form-data" >   */}
        {/* <label>rating</label>
         <select onChange={handleChange}   name ="rating" >
                    <option disabled selected>puntuacion</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
          </select> */}
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
           añadir reseña
          </button></div>:<div className={style.contenedor}>
          <button  disabled  type="submit" className={style.btn}>
          añadir reseña
          </button>
          
     </div>
     
     }
     <div className={style.contenedor}><Link to= '/'>
          <button className={style.button}>Volver</button>
        </Link></div>
        </form> 
    </div>
  )
}