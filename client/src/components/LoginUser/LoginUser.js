import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import style from "./LoginUser.module.css";
import jwt_decode from "jwt-decode";

export default function LoginUser() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  let guestId = localStorage.getItem("userInfo");
  let userToken = JSON.parse(guestId)._id;

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if(userInfo){
      history.push(`/${userToken}`);
    }
  }, [history]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if(email === "" || password === ""){
        alert("Por favor ingrese todos los campos");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3001/api/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      // alert("Bienvenido");
      setEmail("");
      setPassword("");
      history.push("/");
    } catch (error) {
      alert("Usuario o contraseña incorrectos");
      setError(error.response.data.message);
    }
  };

  const [userGoogle, setUserGoogle] = useState({});

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
        <form onSubmit={submitHandler} className={style.containerForm}>
          <input
            className={style.inputEmail}
            value={email}
            type="text"
            placeholder="Correo Electrónico"
            onChange={(e) => setEmail(e.target.value)}
            // required={true}
          />
          <input
            className={style.inputPassword}
            value={password}
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            // required={true}
          />
          <input
            value="Iniciar Sesión"
            className={style.button}
            type="submit"
          ></input>
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

// const dispatch = useDispatch();
//   // const selector = useSelector((state) => state.user);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     const loggedUserJson = window.localStorage.getItem("userLogin")
//     console.log(loggedUserJson)
//     if(loggedUserJson) {
//       const user = JSON.parse(loggedUserJson)
//       dispatch(loginUser(user))
//     }
//   }, [])

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser({email, password}));
//     window.localStorage.setItem(
//       "userLogin" , JSON.stringify({email})
//     );
//     // window.location.href = '/'
//     // history.push("/");

//   }
