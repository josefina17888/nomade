import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./LoginUser.module.css";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginUser } from '../../Redux/Actions/index';
import { useHistory } from "react-router-dom";

export default function LoginUser() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userGoogle, setUserGoogle] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, loggedIn: true }));
  }

  const handleCallbackResponse = (response) => {
    console.log(response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUserGoogle(userObject);
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
    <div>
      <div className={style.containerUser}>
        <h1 className={style.title}>Iniciar Sesión</h1>
        <form onSubmit={(e) => handleSubmit(e)} className={style.containerForm}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.inputEmail}
            type="text"
            placeholder="Correo Electrónico"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={style.inputPassword}
            type="password"
            placeholder="Contraseña"
          />
          <button className={style.button} type="submit">Iniciar Sesion</button>
        </form>
        <span className={style.line}>O</span>
        <div className={style.buttonGoogle} id="google-signin"></div>
        <div className={style.textFinal}>
          <p>¿Aun no tienes cuenta?</p>
          <Link to="/registro">¡Crea tu cuenta aqui!</Link>
        </div>
      </div>
    </div>
  );
}
