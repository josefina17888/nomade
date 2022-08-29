import React ,  {useState , useEffect} from 'react'
import { Link , useParams } from 'react-router-dom'
import axios from 'axios'



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
            <div>
                <img src="https://res.cloudinary.com/dbq85fwfz/image/upload/v1661519437/ilgactrbdnm6gwh2kr49.png" alt="succesVerified" width="10px" height="300px"/>
                <h1> Email verificado satisfactoriamente</h1>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
        )
        : (<h1>404 not found</h1>)}
    </div>
  )
}
