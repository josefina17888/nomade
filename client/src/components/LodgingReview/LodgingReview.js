import React from 'react'
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import { postHost } from "../../Redux/Actions";
//import estilos from './FormHost.module.css'
import {getGuest} from '../../Redux/Actions'

export default function FormHost() {
  const dispatch = useDispatch()

  let guestId = localStorage.getItem("userInfo")
  guestId = JSON.parse(guestId)._id
  const [input,setInput] = useState({
    dni: '',
    hostDniPicture:'',
})
const guestInfo = useSelector((state)=>state.guest)
useEffect(() => {
  dispatch(getGuest(guestId))
  
},[dispatch])


// function handleSubmit(e){
//   e.preventDefault()
//   history.push('/form')
//   alert("host creado")
//  }


  return (
    <div >
      <form action={`http://localhost:3001/api/LodgingReview/${guestId}/62fe7f1db2a41b94d94fd0f4/`} method="POST" encType="multipart/form-data">
        <label>rating</label>
         <select    name ="rating" >
                    <option disabled selected>puntuacion</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
          </select>
        <label>Descripcion</label>
        <input 
        name ="comments"
        type="text"
    
        required
        />
        
        <button type='submit'>Enviar reseña</button>
        </form> 
    </div>
  )
}