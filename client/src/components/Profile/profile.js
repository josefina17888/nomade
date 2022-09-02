import React from "react";
import style from './profile.module.css'
import axios from "axios";
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.js'
import { getGuestByEmail, getDetail } from "../../Redux/Actions";

export default function Profile() {
const params = useParams()
let guestData = localStorage.getItem("userInfo");
let user = JSON.parse(guestData)

//BUSCANDO EL GUEST CON EL EMAIL y LOS BOOKINGS POR GUEST ID y LOS LODGING IDS DE LAS BOOKINGS
const [guest, setGuest] = useState("")
const [booking, setBooking] = useState("")
const [lodgingIds, setLodgingIds] = useState("")

useEffect(() => {
  const getGuestInfo = async () => {
    try {

      let email = params.email
      console.log(email)

      let res = await axios.get("/api/guest/" + email);
      let guestId = res.data[0]._id;
      setGuest(guestId)
      console.log(guest)

      try{
      let response = await axios.get("/api/booking/all/" + guest);
      let guestBooking = response.data
      setBooking(guestBooking)
      console.log(booking)
      let lodgingsGot = []
      await guestBooking.forEach((e) => {
        let lodging = e.lodgingId
        lodgingsGot.push(lodging)
      })
      let lodgingsUnique=[]
      lodgingsGot.forEach((e)=>{
      if(!lodgingsUnique.includes(e)){
          lodgingsUnique.push(e)
        }
      })
      setLodgingIds(lodgingsUnique)
    }catch(err){console.log(err)}
    } catch (err) {
      console.log(err);
    }
  };
  getGuestInfo();
}, [guest]);

let lodgingDetails = []
if (lodgingIds){
const getDetail = async () => {
  lodgingIds.forEach(async (e)=>{
    try{
    let data = await axios.get("/api/lodging/detail/" + e)
    lodgingDetails.push(data.data)
  }  catch(err){
    console.log(err)
  }
})
}
getDetail();
console.log(lodgingDetails)
}



  return (
    <div>
      <div>
        {user === undefined ? (
          <p>Loading...</p>
        ) : (
          <div className="_16grqhk">
            <NavBar />
            <div className={style.container}>
              <div>
                <h2>Detalle del Perfil</h2>
                <h4>Nombre</h4>
                <h6>
                  {user.name.charAt(0).toUpperCase() +
                    user.name.slice(1)}{" "}
                  {user.lastname.charAt(0).toUpperCase() +
                    user.lastname.slice(1)}
                </h6>
                <hr width="700"></hr>
                {user.birthDate ? (
                  <div>
                    <h4>Fecha de Nacimiento</h4>
                    <h6>{(user.birthDate).slice(0, -14)}</h6>
                    <hr width="700"></hr>
                  </div>
                ) : (
                  ""
                )}
                <h4>Correo Electronico</h4>
                <h6>{user.email}</h6>
                <hr width="700"></hr>
                <h4>Contraseña</h4>
                <Link to={`/${user.email}/resetPassword`} ><button>Actualizar Contraseña</button></Link>
                <hr width="700"></hr>
                {user.cellPhone ? (
                  <div>
                    <h4>Telefono</h4>
                    <h6>{user.cellPhone}</h6>
                    <hr width="700"></hr>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <h4>Reservas</h4>
                  <div>
                    {
                      lodgingDetails ? lodgingDetails.map((e)=>
                      <div key={e._id}>
                      title= {e.title}
                      </div>
                      ) : 
                      <div>
                        Aún no tienes reservas para mostrar
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className={style.container_card_profile}>
                <div className={style.card_profile}>
                  <div className={style.foto}>
                    <div className={style._fvp3r0u}>
                      <div>
                        <div className={style._1h6n1zu}>
                          <img
                            src={user.picture}
                            alt="Sin foto.."
                            className={style._9ofhsl}
                          ></img>
                        </div>
                      </div>
                      <div>Actualizar foto</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
