import React ,  {useState , useEffect} from 'react'
import { Link , useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import style from "./ResetPassword.module.css";


export default function ResetPassword() {
    const [validUrl , setValidUrl] = useState(false)
    const [password, setPassword] = useState("");
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
          if (password === "") {
            alert("Por favor ingrese todos los campos");
          }
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.patch(
            //`${process.env.REACT_APP_API}/api/login`,
            `http://localhost:3001/api/passwordReset/newPassord/${params.idGuest}/${params.token}`,
            {
              password,
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
                    value={password}
                    type="password"
                    placeholder="Contraseña"
                    required = {true}
                    onChange={(e) => setPassword(e.target.value)}
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
