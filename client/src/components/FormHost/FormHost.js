import React from 'react'
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import { postHost } from "../../Redux/Actions";
import estilos from './FormHost.module.css'
import {getGuestByEmail, getHostByDni} from '../../Redux/Actions'
import axios from 'axios';
import { TbLetterC } from 'react-icons/tb';

export default function FormHost() {
  const dispatch = useDispatch()

  let guestId = localStorage.getItem("userInfo")
  guestId = JSON.parse(guestId).email
  let hostfoto= useSelector((state)=>state.host)
  
  const [input,setInput] = useState({
    dni: '',
    hostDniPicture:'',
})
const guestInfo = useSelector((state)=>state.duplicate)
console.log(guestId, "guestId")
//-------------
const getUser = async () => {
  try {
    const userData = await axios.get(`/api/guest/${guestId}`)
    console.log(userData.data["0"], "userData")
    return userData
  } catch (err) {
    console.log(err);
  }
};



//----------------
useEffect(() => {
  dispatch(getGuestByEmail(guestId))
  dispatch(getHostByDni(222))
  getUser()
  
},[dispatch])




let tieneDni=true
for (var i in guestInfo[0]){
  if(guestInfo[0].dni !== "" ) {
    tieneDni = false
  }
  // let hostFoto = getHostByDni(guestInfo[0].dni)
  //  console.log("hostFoto")
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

  return (
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
  )
}
