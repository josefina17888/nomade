import React ,  {useState , useEffect} from 'react'
import { Link , useParams } from 'react-router-dom'
import axios from 'axios'
import style from "./Verify.module.css"

// Esta es la ventana de cuando tu correo ya esta verificado con boton para ir a login!

export default function Verify() {
    const [validUrl , setValidUrl] = useState(false)
    const params = useParams()
    useEffect( () => {
        const verifyEmailUrl = async () => {
            try {
                const url = `/api/guest/${params.idGuest}`
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
  return (
    <div>
        {validUrl ? (
            <div className={style.main}>
                <img className={style.img} src="https://res.cloudinary.com/dbq85fwfz/image/upload/v1661519437/ilgactrbdnm6gwh2kr49.png" alt="succesVerified" />
                <h1> Email verificado satisfactoriamente</h1>
                <Link to="/login">
                    <button className={style.login}>Login</button>
                </Link>
            </div>
        )
        : (<h1>404 not found</h1>)}
    </div>
  )
}
