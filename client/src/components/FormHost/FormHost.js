import React from 'react'

export default function FormHost() {
  return (
    <div>FormHost</div>
  )
}
import React from 'react'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import{useDispatch, use} from 'react-redux'
import { postHost } from "../../Redux/Actions";
import estilos from './FormHost.module.css'

export default function FormHost() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [input,setInput] = useState({
    name : '',
    lastName: '',
    email: '',
    cellPhone: '',
    dni: '',
    country: '',
    birthDate: '',
    hostDniPicture:'',
})


function handleName(e){
  setInput({
      ...input,
      [e.target.name]: e.target.value
  })
}
function handleLastName(e){
  setInput({
      ...input,
      [e.target.name]: e.target.value
  })
}
function handleEmail(e){
  setInput({
      ...input,
      [e.target.name]: e.target.value
  })
}

function handleCellPhone(e){
  setInput({
      ...input,
      [e.target.name]: e.target.value
  })
}
function handleDni(e){
  setInput({
      ...input,
      [e.target.name]: e.target.value
  })
}
function handleCountry(e){
  setInput({
      ...input,
      [e.target.name]: e.target.value
  })
}
function handleBirthDate(e){
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

function handleSubmit(e){
  e.preventDefault()
  history.push('/host')
  alert("host creado")
 }


  return (
    <div className={estilos.formulario}>
      <div>FormHost</div>
      {/* <form onSubmit={(e)=>handleSubmit(e)} > */}

      <form action='http://localhost:3001/api/host' method="POST" encType="multipart/form-data" onSubmit={(e)=>handleSubmit(e)}>
        <label>Nombre:</label>
        <input 
        type="text"
        name="name" 
        value={input.name}
        onChange={handleName}
        placeholder="Nombre"
        required
        />
        <label>Apellido:</label>
        <input 
        type="text"
        name= "lastName"
        value={input.lastName}
        onChange={handleLastName}
        placeholder="Apellido"
        required
        />
        <label>Email:</label>
        <input 
        type="text"
        name= "email"
        value={input.email}
        onChange={handleEmail}
        placeholder="Email"
        required
        />
        <label>Telefono:</label>
        <input 
        type="text" 
        name="cellPhone"
        value={input.cellPhone}
        onChange={handleCellPhone}
        placeholder="Telefono"
        required
        />
        <label>DNI:</label>
        <input 
        type="text" 
        name="dni"
        value={input.dni}
        onChange={handleDni}
        placeholder="DNI"
        required
        />
        <label>Pais:</label>
        <input 
        type="text"
        name="country" 
        onChange={handleCountry}
        value={input.country}
        placeholder="Pais"
        />
        <label>Fecha de Nacimiento:</label>
        <input 
        type="date" 
        name="birthDate"
        onChange={handleBirthDate}
        value={input.birthDate}
        placeholder="Fecha de Nacimiento"
        />
        <label>Foto:</label>
        <input 
        name="hostDniPicture"
        type="file"
        onChange={handlePhoto}
        />
        <button type='submit'>Registrarme</button>
        </form>
    </div>
  )
}