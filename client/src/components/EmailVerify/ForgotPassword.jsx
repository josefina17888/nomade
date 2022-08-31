import React ,  {useState , useEffect} from 'react'
import { Link , useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import style from "./ResetPassword.module.css";

// Esta ventana aparece cuando das click a olvide mi contraseña(Ventana de Login) , aca te piden tu email para enivarte un token a tu cuenta de correo y además verifica que si tu email esta en nuestra DB

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState({
        success: "",
        error: ""
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          if (email === "") {
            alert("Por favor ingrese todos los campos");
          }
          const guest = 
          // `${process.env.REACT_APP_API}/api/guest/${email}`
          `http://localhost:3001/api/guest/${email}`
          const {data} = await axios.get(guest);
          if(!data.length) {
            return setMsg({
                ...msg,
                error: "Este correo no esta registrado",
                success: ""
            })
          }
          setMsg({
            ...msg,
            success: "Hemos enviado un link para cambiar tu contraseña a tu correo",
            error: ""
        })   
        
         await axios.post("/api/passwordReset/",{email})



        } catch (error) {
          alert("Algo sucedió mal");
          console.log(error)
        }
      };



  return (
        <div className={style.containerUser}>
            <h1 className={style.title}>¡Hola Nómade!Necesitamos validar tu correo</h1>
            <form onSubmit={submitHandler} className={style.containerForm}>
            <input
                className={style.inputEmail}
                value={email}
                type="text"
                placeholder="Correo Electrónico"
                required = {true}
                onChange={(e) => setEmail(e.target.value)}
            />
            {msg.error && <p>{msg.error}</p> }
            {msg.success && <p>{msg.success}</p> }
            <input
                value="Verificar que sí soy yo!"
                className={style.button}
                type="submit"
            />
            </form>
        </div>
  )
}
