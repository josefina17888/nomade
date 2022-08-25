import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import style from "./LoginUser.module.css";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUserGoogle } from "../../utils/userGoogle";

export default function LoginUser() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/");
    }
  }, [history]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (email === "" || password === "") {
        alert("Por favor ingrese todos los campos");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/login",
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
      alert("Usuario o contraseña incorrectos");
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <div className={style.containerUser}>
        <h1 className={style.title}>Iniciar Sesión</h1>
        <form onSubmit={submitHandler} className={style.containerForm}>
          <input
            className={style.inputEmail}
            value={email}
            type="text"
            placeholder="Correo Electrónico"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={style.inputPassword}
            value={password}
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            value="Iniciar Sesión"
            className={style.button}
            type="submit"
          ></input>
        </form>
        <span className={style.line}>O</span>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
          <GoogleLogin
            className={style.buttonGoogle}
            onSuccess={(response) => {
              createOrGetUserGoogle(response);
              history.push("/");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
        <div className={style.textFinal}>
          <p>¿Aun no tienes cuenta?</p>
          <Link to="/registerguest">¡Crea tu cuenta aqui!</Link>
        </div>
      </div>
    </div>
  );
}