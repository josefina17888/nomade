import React from 'react'
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { Link } from "react-router-dom";
import{useDispatch, useSelector} from 'react-redux'
import { postHost } from "../../Redux/Actions";
//import estilos from './FormHost.module.css'
import {getGuest} from '../../Redux/Actions'
import validate from "./validate";  
import style from "./complaint.module.css";
export default function FormHost(props) {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    tipo: "",
    descripcion: "",})
  let guestId = localStorage.getItem("userInfo")
  guestId = JSON.parse(guestId)._id
  
const guestInfo = useSelector((state)=>state.guest)
useEffect(() => {
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
      <form action={`${process.env.REACT_APP_API}/api/complaint/${guestId}/${props.match.params.lodgingId}/`} method="POST" encType="multipart/form-data">
          <h3 className={style.h3}>¿Que sucede con este alojamiento?</h3>
        <p className={style.clasificacion}>
        <select name="tipo" onChange={handleChange}  id="">
        <option disabled selected>Seleccionar problema:</option>
            <option>No es un alojamiento</option>
            <option>Esa ubicacion no existe</option>
            <option>Es material ofencivo o inadecuado</option>
            <option>Estan vendiendo otro tipo de producto</option>
            <option>otro</option>
        </select>
         </p>
          <p className={style.contenedor}>{errors.tipo}</p>
        <h3 className={style.h3}>Descripcion</h3>
        <div className={style.contenedor}>
        <textarea
        name ="descripcion"
        className={style.contenedor}
        onChange={handleChange}
        value={input.descripcion}
        required
        /></div>
        <p className={style.contenedor}>{errors.descripcion}</p>
        {Object.entries(errors).length === 0 && input.descripcion !== ""?
          <div className={style.contenedor}>
          <button  type="submit" className={style.btn}>
           Denunciar
          </button></div>:<div className={style.contenedor}>
          <button  disabled  type="submit" className={style.btn}>
          Denunciar
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