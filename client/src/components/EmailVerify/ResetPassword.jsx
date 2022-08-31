import React ,  {useState , useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import style from "./ResetPassword.module.css";
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

export default function ResetPassword() {
    const [validUrl , setValidUrl] = useState(false)
    const [password, setPassword] = useState({
      password1: "",
      password2: ""
    });
    const [shown, setShown] = useState(false);
    const switchShown = () => setShown(!shown);
    const params = useParams()
    const history = useHistory()
    useEffect( () => {
        const verifyEmailUrl = async () => {
            try {
                // const url =`http://localhost:3001/api/guest/${params.idGuest}`
                const url =`https://nomade-henry.herokuapp.com/api/guest/${params.idGuest}`
                const {data} = await axios.get(url);
                setValidUrl(true)

            } catch(error) {
                setValidUrl(false)
            }
        }
        verifyEmailUrl()
    }, [params])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {

          if (password.password1 !== password.password2) {
            return alert("La contraseñas deben ser iguales");
          }
           let passwordOne = password.password1
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.patch(
            `${process.env.REACT_APP_API}/api/passwordReset/newPassord/${params.idGuest}/${params.token}`,
            // `http://localhost:3001/api/passwordReset/newPassord/${params.idGuest}/${params.token}`,
            {
              passwordOne,
            },
            config
          );
          setPassword("");
          history.push("/login");
        } catch (error) {
          alert("Usuario o contraseña incorrectos");
          console.log(error)
        }
      };



  return (
    <div>
        {validUrl ? (

            <div className={style.containerUser}>
                <h1 className={style.title}>Cambia tu contraseña</h1>
                <form onSubmit={submitHandler} className={style.containerForm}>
                <input
                    className={style.inputPassword}
                    value={password.password1}
                    type={shown? 'text':'password'}
                    placeholder="Contraseña"
                    required = {true}
                    onChange={(e) => setPassword({...password , password1: e.target.value })}
                />
                <button className={style.password} type="button" onClick={switchShown}>{shown? <IoEyeOffOutline/>: <IoEyeOutline/>}</button>
                <input
                className={style.inputPassword}
                value={password.password2}
                type={shown? 'text':'password'}
                placeholder="Contraseña"
                required = {true}
                onChange={(e) => setPassword({...password , password2: e.target.value })}
                />
                <button className={style.password} type="button" onClick={switchShown}>{shown? <IoEyeOffOutline/>: <IoEyeOutline/>}</button>
                <input
                    value="Cambiar contraseña"
                    className={style.button}
                    type="submit"
                ></input>
                </form>
          </div>
        )
        : (<h1>404 not found</h1>)}
    </div>
  )
}
