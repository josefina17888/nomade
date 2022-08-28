import React ,  {useState , useEffect} from 'react'
import { Link , useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import style from "./ResetPassword.module.css";


export default function ResetPassword() {
    const [validUrl , setValidUrl] = useState(false)
    const [password, setPassword] = useState({
      password1: "",
      password2: ""
    });
    const params = useParams()
    const history = useHistory()
    useEffect( () => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:3001/api/guest/${params.idGuest}`
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
            return alert("La contraseñas deben ser iguales");
          }
           let passwordOne = password.password1
          // if(password !== password2) {
          //   alert("diferentes")
          // }
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          console.log("hola")
          console.log(params.idGuest)
          console.log("hola")
          const { data } = await axios.patch(
            //`${process.env.REACT_APP_API}/api/login`,
            `http://localhost:3001/api/passwordReset/newPassord/${params.idGuest}/${params.token}`,
            {
              passwordOne,
            },
            config
          );
          console.log(data)
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
                    type="password"
                    placeholder="Contraseña"
                    required = {true}
                    onChange={(e) => setPassword({...password , password1: e.target.value })}
                />  
                <input
                className={style.inputPassword}
                value={password.password2}
                type="password"
                placeholder="Contraseña"
                required = {true}
                onChange={(e) => setPassword({...password , password2: e.target.value })}
            />
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
