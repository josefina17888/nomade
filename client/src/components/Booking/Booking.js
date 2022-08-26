import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createNewBooking } from "../../Redux/Actions/index";
import DatePickerOk from "../DatePicker/DatePicker";
import MercadoPago from "../MercadoPago/MercadoPago";

export default function Booking(props) {
  const checkIn = useSelector((state) => state.checkIn);
  const checkOut = useSelector((state) => state.checkOut);
  const lodging = useSelector((state) => state.detail);
  const costNight = lodging.price
  console.log(costNight)
  const lodgingId = props.match.params._id
  const guestInfo = localStorage.getItem("userInfo");
  let userEmail = JSON.parse(guestInfo).email;
  
  const bookingInfo = localStorage.getItem("bookingInfo");
  var preCheckIn= JSON.parse(bookingInfo).startDate;
  var preCheckOut= JSON.parse(bookingInfo).endDate;
  var preGuest =JSON.parse(bookingInfo).guest;
  console.log(preCheckIn, preCheckOut, preGuest)
  const dispatch = useDispatch();
  var noGuest = true;

  const getDatesInRange = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = new Date(start.getTime());
    const dates = [];

    while (nights <= end) {
      dates.push(new Date(nights).getTime());
      nights.setDate(nights.getDate() + 1);
    }
    return dates;
  }; 
  const alldates = getDatesInRange(preCheckIn, preCheckOut);
  const [input, setInput] = useState({
    checkIn: preCheckIn,
    checkOut: preCheckOut,
    night: alldates.length,
    guests: preGuest,
    allDates: alldates,
    email: userEmail,
    lodgingId: lodgingId

  });
  /* const handleChangeInput = (e)=>{
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }*/
  function handleBooking() {

    dispatch(createNewBooking(input));
  } 

  return (
    <div>
      {!noGuest ? (
        <div> Debes registrarte</div>
      ) : (
        <div>
          <div>
            <div>Fechas de tu reservacion</div>
            <div>{`${preCheckIn} - ${preCheckOut}`}</div>
            <button>Editar fechas</button>
            <div>Nómadas</div>
            <div>
              <span>Nómadas adultos</span>
              <button>-</button>
              <input type='number' name='adults' value={input.guestAdults}></input>
              <button>+</button>
            </div>
            <div>
              <span>Nómadas menores</span>
              <button>-</button>
              <input type='number' name='minors' value={input.guestMinors}></input>
              <button>+</button>
            </div>
            <div>
              <span>Mascotas de los nómades</span>
              <button>-</button>
              <input type='number' name='pets' value={input.pets}></input>
              <button>+</button>
            </div>
          </div>
          <div>
            AQUI VA LA CARD

            <Link to= {"/mercadopago"}>
            <button onClick={handleBooking}>
              Reservar
              <MercadoPago bookingId={lodgingId} night={input.night} costNight={input.costNight}/>
            </button>

            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
