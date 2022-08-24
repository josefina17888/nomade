import e from "cors";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import { Link,useHistory } from "react-router-dom";
import {getGuestByEmail} from '../../Redux/Actions'
import {IoCheckmarkCircleOutline, IoCloseCircleOutline} from 'react-icons/io5'
import style from "./FormUser.module.css";

export default function FormUser() {
  const dispatch= useDispatch()
  const history = useHistory()
  const [errors,setErrors] =useState({})
  const [errorButton, setErrorButton]= useState(true)
  const [input, setInput] = useState({
    username: "",
    name: "",
    lastname: "",
    email:"",
    password:"",
    cellPhone:"",
    dni:"",
    country:"",
    picture: "",
    birthDate:""
})    
const guestByEmail = useSelector((state)=>state.duplicate)

  //   function handleSubmit(e){
  //     e.preventDefault()
  //     // dispatch(postGuest(input))  
  //     console.log(e.target.file)
  //     alert("Usuario creado correctamente!!")
  
  
  //     setInput({
  //       username: "",
  //       name: "",
  //       lastname: "",
  //       email:"",
  //       password:"",
  //       cellPhone:"",
  //       dni:"",
  //       country:"",
  //       picture: "",
  //       birthDate:""
  //     })    
  //     history.push("/login")
  // }

// let emailRegistrado = true
// for(var i in guests){
//   if (i[email] === input.email){
//     emailRegistrado = false
//   }
//   console.log(i[email])
// }
function handleChange(e){
  setInput({
    ...input,
    [e.target.name]: e.target.files,
    [e.target.name] : e.target.value,
  })
  // let mensaje = true
    // setErrors(validate({
    //   ...input,
    //   [e.target.name]: e.target.value
    // }))
    // if(Object.keys(errors).length !==0){
    //   setErrorButton(true)
    // }else{
    //   setErrorButton(false)
    // }
    // setNotRequired(required({
    //   ...input,
    //   [e.target.name] : e.target.value,
    // }))
    // if(Object.keys(required.length !==0)){
    //    mensaje = true
    // }else{
    //    mensaje = false
    // }
    dispatch(getGuestByEmail(e.target.value))
}

  return (
    <div className={style.containerUser}>
      <form action= {`${process.env.REACT_APP_API}/api/guest`}  method="POST" encType="multipart/form-data" >

      <h1 className={style.title}>Registrate!</h1>
      <div className={style.containerForm}>
        <input
          type="text"
          name ="name"
          value={input.name}
          placeholder="Nombre"
          onChange={handleChange}
          title="Nombre solo acepta letras y espacios en blanco"
          pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
          required
        />
        <input
          type="text"
          name ="lastname"
          value={input.lastname}
          placeholder="Apellido"
          onChange={handleChange}
          title="Apellido solo acepta letras y espacios en blanco"
          pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
          required
        />
         <input
          type="text"
          name ="email"
          value={input.email}
          placeholder="Email"
          onChange={handleChange}
          title="Email incorrecto"
          pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
          required
          />
          {guestByEmail.length === 0 ? <IoCheckmarkCircleOutline/>: <IoCloseCircleOutline/>}
         <input
          type="password"
          name ="password"
          value={input.password}
          placeholder="contraseña"
          onChange={handleChange}
          title="La contraseña debe contener solo letras [a-z], números[0-9] o caracteres especiales (@#$%&)"
          pattern="^[a-z0-9\.@#\$%&]+$"
          required
        />
        <input
          type="text"
          name ="dni"
          value={input.dni}
          placeholder="dni"
          onChange={handleChange}
          title="El DNI debe contener números positivos"
          pattern="^\d+$"
        />
        <input
          type="text"
          name ="cellPhone"
          value={input.cellPhone}
          placeholder="Celular"
          onChange={handleChange}
          title=""
          pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
        />
         <input
          type="text"
          name ="country"
          value={input.country}
          placeholder="pais"
          onChange={handleChange}
          title="El país solo acepta letras y espacios en blanco"
          pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
        />
         <input
          type="date"
          name ="birthDate"
          value={input.birthDate}
          placeholder="fecha de nacimiento"
          onChange={handleChange}
        />
        <input
          type="file"
          name ="picture"
          value={input.picture}
          placeholder="Foto de perfil"
          onChange={handleChange}
        />
      </div>
      <button className={style.button} type="submit">
        Registrarme
      </button>
  </form>
    </div>
  );
}

