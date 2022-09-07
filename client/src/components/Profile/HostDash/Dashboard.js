import React from "react";
import axios from "axios";
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import style from "./dashboard.module.css"
import Swal from 'sweetalert'

export default function Dashboard({emailGuest}) {

const guest = emailGuest
console.log(guest)

//BUSCANDO EL HOST CON EL GUEST ID Y SUS LODGINGS
const [host, setHost] = useState("")
const [lodg, setLodg] = useState("")
// const [lodgingDets, setLodgingDets] = useState([])
const[bookings, setBookings]= useState("")
const[disabledDates, setDisabledDates]= useState("")

useEffect(() => {
const getHostInfo = async () => {
    try {

        const res = await axios.get(`/api/guest/found/host/${guest}`)
        let hostId = res.data
        setHost(hostId)
        try{
        const response = await axios.get("/api/lodging/"+ hostId)
        let lodgingsGot = response.data
        let lodgingsVisibles= await lodgingsGot.filter((e)=> (e).Visibility===true)
        setLodg(lodgingsVisibles)
        }catch(err){console.log(err)}
       }catch(err){
        console.log(err)
        }
    }
   getHostInfo();
}, [host]);

console.log(host)
console.log(lodg)



const handleClick = (e) => {
    const target= e.target.value
    const id = target
    console.log(id)

    const getBookingsInfo = async () => {
        try {
            const res = await axios.post('/api/booking/booking', id )
            let bookingsGot = res.data
            console.log(bookingsGot)
            setBookings(bookingsGot)

            const unavailableDates = 
            await bookingsGot.map((e) =>
            e.allDates.map((d) => new Date(d).toDateString())
            );

            console.log(unavailableDates)

                   //VER DISPONIBILIDAD DE DATES
            const unavailableDatesMap = await unavailableDates.flat();
            const disabledDates = await unavailableDatesMap.map((e) => new Date(e));
            setDisabledDates(disabledDates)
            console.log(disabledDates)

            if (!disabledDates.length){
            let data = await axios.patch(`/api/lodging/detail/${id}`)
            window.location.reload(true);
            } else {
            return Swal(
                'No puedes eliminar un alojamiento con reservas activas','','error',{buttons:false,timer:3500}
              )
        }
    } catch(err){console.log(err)}
        
}
getBookingsInfo();
}

   return (
    <div>
    <div className={style.container1}>
        {
            !lodg.length ?
            (<div>Aún no has publicado alojamientos</div>) :
            (lodg.map((e)=>
                <div className={style.book} key={e._id}>
                <h5>{e.title}</h5>
                <div className={style.container1}>
                <img src={e.picture["0"]} alt="img not found" width="200" height="130" className={style.img}/>
                <button value={e._id} onClick={(e) => handleClick(e)} className={style.button}>x</button>
                </div>
                </div>
                )) 
        } 
    </div>
    <Link className={style.link} to= {`/profile/${guest}/${host}/reservations`}>Ver reservas de mis alojamientos</Link>
    </div>
   )
}