import React from 'react'
import {useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import{useDispatch} from 'react-redux'
import { postHost } from "../../Redux/Actions";
import estilos from './FormHost.module.css'

export default function FormHost() {
  const dispatch = useDispatch()
  const history = useHistory()

  let guestId = localStorage.getItem("userInfo")
  guestId = JSON.parse(guestId)._id

  const [input,setInput] = useState({
    dni: '',
    hostDniPicture:'',
})

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

function handleSubmit(e){
  e.preventDefault()
  history.push('/form')
  alert("host creado")
 }


  return (
    <div className={estilos.formulario}>
      <div>FormHost</div>
      {/* <form onSubmit={(e)=>handleSubmit(e)} > */}

      <form action={`http://localhost:3001/api/host/${guestId}`} method="POST" encType="multipart/form-data">
        <label>DNI:</label>
        <input 
        type="text" 
        name="dni"
        value={input.dni}
        onChange={handleDni}
        placeholder="DNI"
        required
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