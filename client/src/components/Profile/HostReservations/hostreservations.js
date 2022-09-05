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
          
          
          const handleClick2 = ({_id}) => {
            const getBook = async () => {
            try{
                let data = await axios.patch("/api/booking/" + _id)
                }catch(err){
                console.log(err)
                }
            }
            getBook();
        }

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
         <div>
            <div>
                <DatePicker
                value={date}
                highlightDates={disabledDates}
                disabledKeyboardNavigation
                monthsShown={2}
                inline
                />
            </div>
        </div>
        {
                           
            !bookings ? <h5>Selecciona un alojamiento para conocer sus reservas</h5> :
            bookings.map((e)=>
            <div>
                <div className={style.container1}>
                <div className={style.container2}>
                <div className={style.margin}>
                <h6>Check In: {new Date (e.checkIn).toLocaleDateString()} </h6>
                </div>
                <div className={style.margin}>
                <h6>Check Out: {new Date (e.checkOut).toLocaleDateString()} </h6>
                </div>
                </div>
                <div className={style.margin}>
                <button onClick={(e) => handleClick2(e._id)} className={style.button}>x</button>
                </div>
                </div>
            </div>
            )
                        
        }
        </div>
    </div>
    )
}





