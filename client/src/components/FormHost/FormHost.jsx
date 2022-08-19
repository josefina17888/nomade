import {React, useState} from 'react'
import{useDispatch} from 'react-redux'
import { postHost } from "../../Redux/Actions";
import estilos from './FormHost.module.css'

export default function FormHost() {
  const dispatch = useDispatch()
  
  const [input,setInput] = useState({
    name : '',
    lastName: '',
    email: '',
    cellPhone: '',
    dni: '',
    country: '',
    birthDate: '',
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
      [e.target.lastName]: e.target.value
  })
}
function handleEmail(e){
  setInput({
      ...input,
      [e.target.email]: e.target.value
  })
}

function handleCellPhone(e){
  setInput({
      ...input,
      [e.target.cellPhone]: e.target.value
  })
}
function handleDni(e){
  setInput({
      ...input,
      [e.target.dni]: e.target.value
  })
}
function handleCountry(e){
  setInput({
      ...input,
      [e.target.country]: e.target.value
  })
}
function handleBirthDate(e){
  setInput({
      ...input,
      [e.target.birthDate]: e.target.value
  })
}

function handleSubmit(e){
  e.preventDefault()
  dispatch(postHost(input))
      alert('Host creado!')
      // Swal(
      //     'Host Creado!','','success',{buttons:false,timer:2000}
      //   )
      setInput({ name : '',
      lastName: '',
      email: '',
      cellPhone: '',
      dni: '',
      country: '',
      birthDate: '',
      })
       
 }


  return (
    <div className={estilos.formulario}>
      <div >FormHost</div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label>Nombre:</label>
        <input 
        type="text" 
        value={input.name}
        onChange={handleName}
        placeholder="Nombre"
        required
        />
        <label>Apellido:</label>
        <input 
        type="text" 
        value={input.lastName}
        onChange={handleLastName}
        placeholder="Apellido"
        required
        />
        <label>Email:</label>
        <input 
        type="text" 
        value={input.email}
        onChange={handleEmail}
        placeholder="Email"
        required
        />
        <label>Telefono:</label>
        <input 
        type="text" 
        value={input.cellPhone}
        onChange={handleCellPhone}
        placeholder="Telefono"
        required
        />
        <label>DNI:</label>
        <input 
        type="text" 
        value={input.dni}
        onChange={handleDni}
        placeholder="DNI"
        required
        />
        <label>Pais:</label>
        <input 
        type="text" 
        onChange={handleCountry}
        value={input.country}
        placeholder="Pais"
        />
        <label>Fecha de Nacimiento:</label>
        <input 
        type="date" 
        onChange={handleBirthDate}
        value={input.birthDate}
        placeholder="Fecha de Nacimiento"
        />
        <label>Foto:</label>
        <input 
        type="file" 
        />
        <button type='submit'>Registrarme</button>
      </form>
    </div>
  )
}
