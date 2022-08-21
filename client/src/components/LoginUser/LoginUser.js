import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./LoginUser.module.css";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../Redux/Actions/index';


export default function LoginUser() {
  const dispatch = useDispatch();
  // const selector = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userGoogle, setUserGoogle] = useState({});
  
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("userLogin")
    console.log(loggedUserJson)
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(loginUser(user))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password}));
    window.localStorage.setItem(
      "userLogin" , JSON.stringify({email})
    );
    // window.location.href = '/'
    // history.push("/");

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
            // required={true}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={style.inputPassword}
            type="password"
            placeholder="Contraseña"
            // required={true}
          />
          <input  value='Iniciar Sesión' className={style.button} type="submit"></input>
        </form>
        <span className={style.line}>O</span>
        <div className={style.buttonGoogle} id="google-signin"></div>
        <div className={style.textFinal}>
          <p>¿Aun no tienes cuenta?</p>
          <Link to="/registerguest">¡Crea tu cuenta aqui!</Link>
        </div>
      </div>
    </div>
  );
}
