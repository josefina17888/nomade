import React from 'react'
import {useState} from 'react'
import {useHistory } from 'react-router-dom'
import{useDispatch} from 'react-redux'
import { postHost } from "../../Redux/Actions";
import estilos from './FormHost.module.css'

export default function FormHost() {
  const dispatch = useDispatch()
  const history = useHistory()

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

      <form action='http://localhost:3001/api/host/62fee8c2b61823ba9f599567' method="POST" encType="multipart/form-data">
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