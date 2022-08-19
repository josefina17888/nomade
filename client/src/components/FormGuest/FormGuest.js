import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./FormUser.module.css";
import jwt_decode from "jwt-decode";

export default function FormUser() {

  const [user, setUser] = useState({})

  const handleCallbackResponse = (response) => {
    console.log(response.credential);
    let userObject = jwt_decode(response.credential)
    console.log(userObject)
    setUser(userObject)
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "256902498483-9ebr0f78d0u8qjh7n6db8u5haao7826a.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("google-signin"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className={style.containerUser}>
      <h1 className={style.title}>Iniciar Sesión</h1>
      <div className={style.containerForm}>
        <input
          className={style.inputEmail}
          type="text"
          placeholder="Correo Electrónico"
        />
        <input
          className={style.inputPassword}
          type="password"
          placeholder="Contraseña"
        />
      </div>
      <button className={style.button} type="submit">
        Iniciar Sesion
      </button>
      <span className={style.line}>O</span>
      <div className={style.buttonGoogle} id="google-signin"></div>
      <div className={style.textFinal}>
        <p>¿Aun no tienes cuenta?</p>
        <Link to="/registro">¡Crea tu cuenta aqui!</Link>
      </div>
    </div>
  );
}
