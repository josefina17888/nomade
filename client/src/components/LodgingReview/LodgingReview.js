import React from 'react'
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import { postHost } from "../../Redux/Actions";
//import estilos from './FormHost.module.css'
import {getGuest} from '../../Redux/Actions'
import validate from "./validate";  
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
    <div >
      <form action={`http://localhost:3001/api/LodgingReview/${guestId}/${props.match.params.lodgingId}/`} method="POST" encType="multipart/form-data">
        <label>rating</label>
         <select onChange={handleChange}   name ="rating" >
                    <option disabled selected>puntuacion</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
          </select>
          <p>{errors.rating}</p>
        <label>Comentarios</label>
        
        <input 
        name ="comments"
        type="text"
        onChange={handleChange}
        value={input.comments}
        required
        />
        <p>{errors.comments}</p>
        {Object.entries(errors).length === 0 && input.comments !== ""?
          <div>
          <button  type="submit">
           añadir reseña
          </button></div>:<div>
          <button  disabled  type="submit">
          añadir reseña
          </button>
     </div>
     }
        </form> 
    </div>
  )
}