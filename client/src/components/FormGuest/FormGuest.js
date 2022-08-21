import React from "react";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux"
import { Link,useHistory } from "react-router-dom";
import style from "./FormUser.module.css";


export default function FormUser() {
  const dispatch= useDispatch()
  const history = useHistory()
 
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
  useEffect(() => {
  }, []);


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




  function handleChange(e){
    console.log(e.target.files)
    setInput({
        ...input,
        [e.target.name]: e.target.files,
        [e.target.name] : e.target.value,
       
    })
   
}


  return (
    <div className={style.containerUser}>


      <form action="http://localhost:3001/api/guest"  method="POST" encType="multipart/form-data" >

      <h1 className={style.title}>Registrate!</h1>
      <div className={style.containerForm}>
        <input
          // className={style.inputEmail}
          type="text"
          name ="username"
          value={input.username}
          placeholder="Nombre de usuario"
          onChange={handleChange}
        />
         <input
          // className={style.inputEmail}
          type="text"
          name ="name"
          value={input.name}
          placeholder="Nombre"
          onChange={handleChange}
        />
        <input
          // className={style.inputPassword}
          type="text"
          name ="lastname"
          value={input.lastname}
          placeholder="Apellido"
          onChange={handleChange}
        />
         <input
          // className={style.inputEmail}
          type="text"
          name ="email"
          value={input.email}
          placeholder="Email"
          onChange={handleChange}
        />
         <input
          // className={style.inputEmail}
          type="password"
          name ="password"
          value={input.password}
          placeholder="contraseña"
          onChange={handleChange}
        />
        <input
          // className={style.inputEmail}
          type="text"
          name ="dni"
          value={input.dni}
          placeholder="dni"
          onChange={handleChange}
        />
        <input
          // className={style.inputPassword}
          type="text"
          name ="cellPhone"
          value={input.cellPhone}
          placeholder="Celular"
          onChange={handleChange}
        />
         <input
          // className={style.inputEmail}
          type="text"
          name ="country"
          value={input.country}
          placeholder="pais"
          onChange={handleChange}
        />
         <input
          // className={style.inputEmail}
          type="date"
          name ="birthDate"
          value={input.birthDate}
          placeholder="fecha de nacimiento"
          onChange={handleChange}
        />
        <input
          // className={style.inputPassword}
          type="file"
          name ="picture"
          value={input.picture}
          placeholder="Foto de perfil"
          onChange={handleChange}
        />
      </div>
      <button className={style.button} type="submit">
        Iniciar Sesion
      </button>
  </form>
    </div>
  );



}

