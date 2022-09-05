import React from "react";
import axios from "axios";
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import style from "./hostreservations.module.css"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Reservations() {
    const params = useParams()
    let guestEmail = params.guest
    let hostId = params.hostId
    
    const[lodgings, setLodgings] = useState("")
    const [date, setDate] = useState(new Date());
    const[bookings, setBookings]= useState("")

    useEffect(() => {
        const getLodgingsInfo = async () => {
            try {
                const response = await axios.get("/api/lodging/" + hostId)
                let lodgingsGot = response.data
                setLodgings(lodgingsGot)
               }catch(err){
                console.log(err)
                }
            }
           getLodgingsInfo();
        }, []);

        console.log(lodgings)
    
        const handleClick = (props) => {
            const getBookingsInfo = async () => {
                try {
                    const res = await axios.post('/api/booking/booking', props)
                    let bookingsGot = res.data
                    setBookings(bookingsGot)
                   }catch(err){
                    console.log(err)
                    }
                }
               getBookingsInfo();
          };

          console.log(bookings)

    return(
        <div className={style.container1}>
        <div className={style.container2}>
        {
            !lodgings.length ?
            (<div>Aún no has publicado alojamientos</div>) :
            (lodgings.map((e)=>
                <div className={style.book} key={e._id}>
                <h5>{e.title}</h5>
                <img src={e.picture["0"]} alt="img not found" width="200" height="130"/>
                <button className={style.link} onClick={(e) => handleClick(e._id)}>Ver calendario de reservas</button>
                </div>
                )) 
        } 
        </div>
        <div className={style.calendar}>
         <div className='app'>
            <div className='calendar-container'>
                <Calendar onChange={setDate} value={date} />
            </div>
        </div>
        </div>
    </div>
    )
}