import React from "react";
import axios from "axios";
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import {getBookingByLodgingId} from "../../../Redux/Actions/index"
import { Link } from 'react-router-dom';
import style from "./hostreservations.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Reservations() {
    const params = useParams()
    let guestEmail = params.guest
    let hostId = params.hostId
    
    const[lodgings, setLodgings] = useState("")
    const [date, setDate] = useState(new Date());
    const[bookings, setBookings]= useState("")
    const[disabledDates, setDisabledDates]= useState("")

//SELECT STATES FROM REDUX
const dispatch = useDispatch()
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
    
        const handleClick = (e) => {
            const target= e.target.value
            const id= { lodgingId: target }
            const getBookingsInfo = async () => {
                try {
                    const res = await axios.post('/api/booking/booking', id )
                    console.log(e.target.value)
                    let bookingsGot = res.data
                    console.log(bookingsGot)
                    setBookings(bookingsGot)

                    const unavailableDates = 
                    await bookingsGot.map((e) =>
                    e.allDates.map((d) => new Date(d).toDateString())
                    );

                           //VER DISPONIBILIDAD DE DATES
                    const unavailableDatesMap = unavailableDates.flat();
                    const disabledDates = await unavailableDatesMap.map((e) => new Date(e));
                    setDisabledDates(disabledDates)

                   }catch(err){
                    console.log(err)
                    }
                }
               getBookingsInfo();
          };
          console.log(bookings)
          console.log(disabledDates)
          


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
                <button className={style.link} value={e._id} onClick={(e) => handleClick(e)}>ver calendario de reservas</button>
                </div>
                )) 
        } 
        </div>
        <div className={style.calendar}>
         <div className='app'>
            <div className='calendar-container'>
                <DatePicker
                value={date}
                highlightDates={disabledDates}
                disabledKeyboardNavigation
                monthsShown={2}
                inline
                />
            </div>
        </div>
        </div>
    </div>
    )
}





