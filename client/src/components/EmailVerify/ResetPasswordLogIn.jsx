import React ,  {useState, useEffect } from 'react'
import { useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import style from "./ResetPassword.module.css";
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import Swal from 'sweetalert'


export default function ResetPassword() {
    const [validUrl, setValidUrl] = useState(false)
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
                const url = 
                // `${process.env.REACT_APP_API}/api/guest/${params.email}`
                `http://localhost:3001/api/guest/${params.email}`
                const {data} = await axios.get(url);
                console.log(data)
                setValidUrl(true)

            } catch(error) {
                console.log(error)
                setValidUrl(false)
            }
        }
        verifyEmailUrl()
    }, [params])


    const submitHandler = async (e) => {
        e.preventDefault();
        try {

          if (password.password1 !== password.password2) {
            // return alert("La contraseñas deben ser iguales");
            return Swal(
              'La contraseñas deben ser iguales','','warning',{buttons:false,timer:3000}
            )
          }
           let passwordOne = password.password1
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.patch(
            // `/api/passwordReset/newPassordLogIn/${params.email}`,
            `http://localhost:3001/api/passwordReset/newPassordLogIn/${params.email}`,
            {
              passwordOne,
            },
            config
          );
          setPassword("");
          history.push("/login");
        } catch (error) {
          // alert("Usuario o contraseña incorrectos");
          Swal(
            'Usuario o contraseña incorrecta','','error',{buttons:false,timer:3500}
          )
        }
      };



  return (
    <div>
        {

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
        
        }
    </div>
  )
}
