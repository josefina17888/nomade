// import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useHistory } from "react-router-dom";
// import style from "./LoginUser.module.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleLogin } from "@react-oauth/google";
// import { createOrGetUserGoogle } from "../../utils/userGoogle";
// import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
// import logoImage from '../../assets/nomadeLogo.svg';

// export default function LoginUser() {
//   const history = useHistory();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [shown, setShown] = useState(false);
//     const switchShown = () => setShown(!shown);
//   let guestId = localStorage.getItem("userInfo");
//   if(guestId) {let user = JSON.parse(guestId)}
//   console.log("pruiebasasdasd")
//   console.log(guestId)

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) {
//       history.push(`/`);
//     }
//   }, [history]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (email === "" || password === "") {
//         alert("Por favor ingrese todos los campos");
//       }
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const { data } = await axios.post(
//         // `${process.env.REACT_APP_API}/api/login`,
//         "http://localhost:3001/api/login",
//         {
//           email,
//           password,
//         },
//         config
//       );
//       console.log("acaaaaaaaaa",data)
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setEmail("");
//       setPassword("");
//       history.push("/");
//     } catch (error) {
//       alert("Usuario o contraseña incorrectos");
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div className={style.containerUser}>
//         <img src={logoImage} alt='Nomade Logo' className={style.logo}></img>
//         <h1 className={style.title}>Iniciar Sesión</h1>
//         <form onSubmit={submitHandler} className={style.containerForm}>

//           <input
//             className={style.inputEmail}
//             value={email}
//             type="text"
//             placeholder="Correo Electrónico"
//             required = {true}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             className={style.inputPassword}
//             value={password}
//             type={shown? 'text':'password'}
//             placeholder="Contraseña"
//             required = {true}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button className={style.password} type="button" onClick={switchShown}>{shown? <IoEyeOffOutline/>: <IoEyeOutline/>}</button>
//           <input
//             value="Iniciar Sesión"
//             className={style.button}
//             type="submit"
//           ></input>
//             <Link className={style.link} to="/forgot-password/"><p>¿Olvidaste tu contraseña?</p></Link>
//         </form>
//         <span className={style.line}>O</span>
//         <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
//           <GoogleLogin
//             className={style.buttonGoogle}
//             onSuccess={(response) => {
//               createOrGetUserGoogle(response);
//               history.push("/");
//             }}
//             onError={() => {
//               console.log("Login Failed");
//             }}
//           />
//         </GoogleOAuthProvider>
//         <div className={style.textFinal}>
//           <p>¿Aun no tienes cuenta?</p>
//           <Link className={style.link2} to="/registerguest">¡Crea tu cuenta aqui!</Link>
//         </div>
//       </div>
//     </div>
//   );
// }


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

export default function LoginUser() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shown, setShown] = useState(false);
      const switchShown = () => setShown(!shown);
  let guestId = localStorage.getItem("userInfo");
  let user = JSON.parse(guestId);
  console.log(guestId);
  console.log(user);
  //let userToken = guestId._id;

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
        alert("Por favor ingrese todos los campos");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        // `${process.env.REACT_APP_API}/api/login`,
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
      alert("Usuario o contraseña incorrectos");
      console.log(error);
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
          <Link className={style.link2} to="/registerguest">¡Crea tu cuenta aqui!</Link>
        </div>
      </div>
    </div>
  );
}