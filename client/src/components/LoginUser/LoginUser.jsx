import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import style from "./LoginUser.module.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { createOrGetUserGoogle } from "../../utils/userGoogle";
import logoImage from '../../assets/nomadeLogo.svg';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import Swal from 'sweetalert'


export default function LoginUser() {
  const history = useHistory();
  const[baneado, setBaneado] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState({
    msgNotRegister: "",
    msgNotVerify: "",
    msgBan: ""
  });
  const [shown, setShown] = useState(false);
      const switchShown = () => setShown(!shown);


  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push(`/`);
    }
  }, [history]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (email === "" || password === "") {
        // alert("Por favor ingrese todos los campos");
        Swal(
          'Por favor ingrese todos los campos','','warning',{buttons:false,timer:3500}
        )

      }
      const guest = await axios.get(`/api/guest/${email}`)
      if(guest.data.length === 0) return setMsg({...msg , msgNotRegister: "Correo no está registrado" , msgNotVerify: "" })
      if(guest.data[0].Visibility === false) return setMsg({...msg , msgBan: "Tu usuario ha sido baneado de Nomade." })
      if(guest.data[0].verified === false) return setMsg({...msg , msgNotVerify: "Tu correo no esta verificado" })
     
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        // `/api/login`,
        "http://localhost:3001/api/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setEmail("");
      setPassword("");
      history.push("/");
    } catch (error) {
      // alert("Usuario o contraseña incorrectos");
      Swal(
        'Usuario o contraseña incorrecta','','error',{buttons:false,timer:3500}
      )
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setMsg({
        ...msg,
        msgNotVerify: "Hemos enviado un link para cambiar tu contraseña a tu correo",
    })
    console.log(email)
    await axios.post("/api/guest/reverified",{email})
    setMsg({
      ...msg,
      msgNotVerify: "",
  })
    } catch (error) {
      alert("Algo sucedió mal");
      console.log(error)
    }
  };

  return (
    <div>
      <div className={style.containerUser}>
        <img src={logoImage} alt='Nomade Logo' className={style.logo}></img>
        <h1 className={style.title}>Iniciar Sesión</h1>
        <form onSubmit={submitHandler} className={style.containerForm}>
          <div className={style.group}>
            <input
              type="text"
              className={style.input}
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={style.highlight}></span>
            <span className={style.bar}></span>
            <label className={style.labelA}>Correo Electrónico</label>
          </div>
          <div className={style.group2}>
            <input
              type={shown? 'text':'password'}
              className={style.input}
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={style.highlight}></span>
            <span className={style.bar}></span>
            <label className={style.labelA}>Contraseña</label>
          </div>
          <div>
          {msg.msgBan !=="" && <div className={style.msg}>{msg.msgBan}</div>}
          {msg.msgNotRegister && msg.msgBan ==="" && <div  className={style.msg}>{msg.msgNotRegister}</div>}
          {msg.msgNotVerify && <div>
            <p  className={style.msg}>{msg.msgNotVerify}</p>
            <button  className={style.button} onClick={handleClick}> Verificar Email</button>
            </div>}
          </div>
          
          <button className={style.password} type="button" onClick={switchShown}>{shown? <IoEyeOffOutline/>: <IoEyeOutline/>}</button>
          <input
            value="Iniciar Sesión"
            className={style.button}
            type="submit"
          ></input>
        </form>
        <Link className={style.link} to="/forgot-password/">¿Olvidaste tu contraseña?</Link>
        <span className={style.line}>O</span>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
          <GoogleLogin
            className={style.buttonGoogle}
            onSuccess={(response) => {
              console.log(response)
                createOrGetUserGoogle(response)
                .then( (reponse) => {
                  console.log(response.json)
                  history.push("/")
                })
                .catch( () => {
                  Swal(
                    'Usuario baneado','','error',{buttons:false,timer:3500}
                  )
                  setBaneado("pepito")
                } ) 
            }}
            onError={(response) => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
        {baneado && <p>Estas baneado</p>}
        <div className={style.textFinal}>
          <p>¿Aun no tienes cuenta?</p>
          <Link className={style.link2} to="/registerguest">¡Crea tu cuenta aqui!</Link>
        </div>
      </div>
    </div>
  );
}
