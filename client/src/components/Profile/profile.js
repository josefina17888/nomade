import React from "react";
import style from './profile.module.css'
import axios from "axios";
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.js'
import { getGuestByEmail, getDetail } from "../../Redux/Actions";
import Dashboard from "./HostDash/Dashboard";

export default function Profile() {
const params = useParams()
let guestData = localStorage.getItem("userInfo");
let user = JSON.parse(guestData)
let email = params.email

//BUSCANDO EL GUEST CON EL EMAIL y LOS BOOKINGS POR GUEST ID y LOS LODGING IDS DE LAS BOOKINGS
const [guest, setGuest] = useState("")
const [booking, setBooking] = useState("")
const [lodgingIds, setLodgingIds] = useState("")
const [lodgingDets, setLodgingDets] = useState([])
// const [lodgingComplete, setLodgingComplete] = useState([])
// let lodgingDetails = []

useEffect(() => {
  const getGuestInfo = async () => {
    try {

      let res = await axios.get("/api/guest/" + email);
      let guestId = res.data[0]._id;
      setGuest(guestId)

      // try{
      let response = await axios.get("/api/booking/all/" + guest);
      let guestBooking = response.data
      //sacar las dos fechas y el lodging id
      setBooking(guestBooking)

      try{
      var lodgingsGot = []
      await guestBooking.forEach(async (e) => {
        let subArray = []
        let lodgingId = e.lodgingId
        let checkIn = new Date (e.checkIn).toLocaleDateString()
        let checkOut = new Date (e.checkOut).toLocaleDateString()
        subArray.push(lodgingId)
        subArray.push(checkIn)
        subArray.push(checkOut)
      
          // let data = await axios.get("/api/lodging/detail/" + e.lodgingId)
          // let title = data.data.title
          // subArray.push(title)

        lodgingsGot.push(subArray)
      })
      
     async function bringTitle (){
      await lodgingsGot.forEach(async (e)=>{
          try{
            let data = await axios.get("/api/lodging/detail/" + e["0"])
            let title = data.data.title
            // let picture = data.data.picture["0"]
            e.push(title)
            }catch(err){
            console.log(err)
            }
          })}
      await bringTitle()
       
       }catch(err){console.log(err)}
       setLodgingIds(lodgingsGot)
       
      // if(!lodgingsUnique.includes(e)){
      //     lodgingsUnique.push(e)
      //   }
      // })
      // setLodgingIds(lodgingsUnique)
    // }catch(err){console.log(err)}

    // if (lodgingsUnique){
    //   // const getDetail = () => {
    //   let lodgingDetails = []
    //   lodgingsUnique.forEach(async (e)=>{
    //   try{
    //     let data = await axios.get("/api/lodging/detail/" + e)
    //     let final = data.data
    // //   lodgingsCombined.push(e)
    //     lodgingDetails.push(final)
    //     }catch(err){
    //     console.log(err)
    //     }
    //     setLodgingDets(lodgingDetails)
    //   })
    //  }

    //  let bookingsLodging = []
    //  lodgingDets.forEach(async (elem) => 
    //  {let id = elem._id
    //   let filtered = await guestBooking.filter((e)=>e.lodgingId === id)
    //   elem.concat(filtered)
    //   bookingsLodging.push(elem)
    //   setLodgingComplete(bookingsLodging)
    // })
    
    } catch (err) {
      console.log(err);
    }
  };
  getGuestInfo();
}, []);

console.log(email)
console.log(guest)
console.log(booking)
console.log(lodgingIds)
// console.log(lodgingDets)


// let bookingsLodging = []
// lodgingDets.forEach(async (elem) => 
//      {let id = elem._id
//       elem.filtered = await booking.filter((e)=>e.lodgingId === id)
//       // let concatenado = elem.concat(filtered)
//       bookingsLodging.push(elem)
// })

// console.log(bookingsLodging)

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
                <h4 className={style.titles}>Nombre</h4>
                <h6>
                  {user.name.charAt(0).toUpperCase() +
                    user.name.slice(1)}{" "}
                  {user.lastname.charAt(0).toUpperCase() +
                    user.lastname.slice(1)}
                </h6>
                <hr width="700"></hr>
                {user.birthDate ? (
                  <div>
                    <h4 className={style.titles}>Fecha de Nacimiento</h4>
                    <h6>{(user.birthDate).slice(0, -14)}</h6>
                    <hr width="700"></hr>
                  </div>
                ) : (
                  ""
                )}
                <h4 className={style.titles}>Correo Electronico</h4>
                <h6>{user.email}</h6>
                <hr width="700"></hr>
                <h4 className={style.titles}>Contraseña</h4>
                <Link to={`/${user.email}/resetPassword`} ><button>Actualizar Contraseña</button></Link>
                <hr width="700"></hr>
                {user.cellPhone ? (
                  <div>
                    <h4 className={style.titles}>Telefono</h4>
                    <h6>{user.cellPhone}</h6>
                    <hr width="700"></hr>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <h4 className={style.titles}>Reservas</h4>
                  <hr width="700"></hr>
                  <div className={style.container1}>
                    {
                      !lodgingIds.length ?                       
                      <div>
                      Aún no tienes reservas para mostrar
                      </div> :
                      lodgingIds.map((e)=>
                      <div className={style.book} key={e["0"]}>
                      <h5>{e["3"]}</h5>
                      <h5>Check In: {e["1"]}</h5>
                      <h5>Check Out: {e["2"]}</h5>
                      {/* <img src={e["4"]} alt="img not found"/> */}
                        <Link className={style.link} to= {`/detail/${e["0"]}`}>Ver detalles de mi reserva</Link>
                      </div>
                      ) 

                    }
                  </div>
                  <div>
                  <h4 className={style.titles}>Alojamientos</h4>
                  <hr width="700"></hr>
                  <Dashboard emailGuest={email}/>
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