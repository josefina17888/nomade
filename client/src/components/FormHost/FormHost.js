import React from 'react'
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import { postHost } from "../../Redux/Actions";
import estilos from './FormHost.module.css'
import {getGuest} from '../../Redux/Actions'
import NavBar from '../NavBar/NavBar';

export default function FormHost() {
  const dispatch = useDispatch()

  let guestId = localStorage.getItem("userInfo")
  guestId = JSON.parse(guestId).email
  const [input,setInput] = useState({
    dni: '',
    hostDniPicture:'',
})
const guestInfo = useSelector((state)=>state.guest)
useEffect(() => {
  dispatch(getGuest(guestId.email))
  
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
    <div>
      <NavBar/>
    <div className={estilos.formulario}>
    { tieneDni ?
    // <form action= {`${process.env.REACT_APP_API}/api/host/${guestId}`}  method="POST" encType="multipart/form-data" > 
    <form action={`http://localhost:3001/api/host/${guestId}`} method="POST" encType="multipart/form-data">
        <label>DNI:</label>
        <input 
        type="number" 
        name="dni"
        value={input.dni}
        onChange={handleDni}
        placeholder="DNI"
        required
        />
        <label>Foto de tu DNI:</label>
        <input 
        name="hostDniPicture"
        type="file"
        onChange={handlePhoto}
        required
        />
        <button type='submit'>Registrarme</button>
      </form>
        :
    // <form action= {`${process.env.REACT_APP_API}/api/host/${guestId}`}  method="POST" encType="multipart/form-data" >
    <form action={`http://localhost:3001/api/host/${guestId}`} method="POST" encType="multipart/form-data">

    <label>Foto:</label>
    <input 
    name="hostDniPicture"
    type="file"
    onChange={handlePhoto}
    required
    />
    <button type='submit'>Registrarme</button>
    </form>
  }
  </div>
  </div>
  )
}
