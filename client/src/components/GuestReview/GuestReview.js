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

let tieneDni=true
for (var i in guestInfo[0]){
  if(guestInfo[0].dni !== "") {
    tieneDni = false
  }
}

function handleDni(e){
  setInput({
      ...input,
      [e.target.name]: e.target.value
  })
}


function handlePhoto(e){
  setInput({
      ...input,
      [e.target.name]: e.target.value
  })
}

// function handleSubmit(e){
//   e.preventDefault()
//   history.push('/form')
//   alert("host creado")
//  }


  return (
    <div >
      <form action={`http://localhost:3001/api/guestReview/62fe7e5f63af87bd0c2a035b/${guestId}`} method="POST" encType="multipart/form-data">
      {/* <form action= {`${process.env.REACT_APP_API}/api/guestReview/62fe7e5f63af87bd0c2a035b/${guestId}`}  method="POST" encType="multipart/form-data" >   */}
        <label>rating</label>
         <select   onChange={handleDni}  name ="rating" >
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
        onChange={handlePhoto}
        required
        />
        
        <button type='submit'>Enviar reseña</button>
        </form> 
    </div>
  )
}