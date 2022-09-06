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
    cbu: '',
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

function handleCbu(e){
  setInput({
      ...input,
      [e.target.name]: e.target.value
  })
}

function handleBank(e){
  setInput({
      ...input,
      [e.target.name]: e.target.value
  })
}

function handleCellphone(e){
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
    <div>
      <NavBar/>
    <div className={estilos.formulario}>
    { tieneDni ?
    // <form action= {`${process.env.REACT_APP_API}/api/host/${guestId}`}  method="POST" encType="multipart/form-data" > 

   <form action={`http://localhost:3001/api/host/${guestId}`} method="POST" encType="multipart/form-data">

        <label>Documento Nacional de Identidad:</label>
        <input 
        className={estilos.margin}
        type="number" 
        name="dni"
        value={input.dni}
        onChange={handleDni}
        placeholder="DNI"
        required
        />
        <label>Foto de tu Documento Nacional de Identidad:</label>
        <input 
        className={estilos.margin}
        name="hostDniPicture"
        type="file"
        onChange={handlePhoto}
        required
        />
        <label>Clave Bancaria Única:</label>
        <input 
        type="number" 
        name="cbu"
        value={input.cbu}
        onChange={handleCbu}
        placeholder="CBU"
        required
        />
        <h6 className={estilos.ac}>Ingresá la Clave Bancaria Única a la que transferiremos las ganancias de tus reservas</h6>
        <label>Entidad Bancaria:</label>
        <input 
        type="string" 
        name="bank"
        value={input.bank}
        onChange={handleBank}
        placeholder="Entidad Bancaria"
        required
        />
        <label>Teléfono Celular:</label>
        <input 
        type="string" 
        name="cellphone"
        value={input.cellphone}
        onChange={handleCellphone}
        placeholder="+(54)1133445566"
        required
        />
        <button type='submit'>Registrarme</button>
      </form>
        :
    // <form action= {`${process.env.REACT_APP_API}/api/host/${guestId}`}  method="POST" encType="multipart/form-data" >
    <form action={`http://localhost:3001/api/host/${guestId}`} method="POST" encType="multipart/form-data">
      <label>Clave Bancaria Única:</label>
      <input 
      type="number" 
      name="cbu"
      value={input.cbu}
      onChange={handleCbu}
      placeholder="CBU"
      required
      />
        <label>Entidad Bancaria:</label>
        <input 
        type="string" 
        name="bank"
        value={input.bank}
        onChange={handleBank}
        placeholder="Entidad Bancaria"
        required
        />
        <label>Teléfono Celular:</label>
        <input 
        type="string" 
        name="cellphone"
        value={input.cellphone}
        onChange={handleCellphone}
        placeholder="+(54)1133445566"
        required
        />
    <label>Foto de tu Documento Nacional de Identidad:</label>
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