import { start } from "@popperjs/core";
import React, { useState } from "react";
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
console.log(lodgingId)
  const guestInfo = localStorage.getItem("userInfo");
  let userEmail = JSON.parse(guestInfo).email;
  
  const dispatch = useDispatch();
  var noGuest = false;
  if (lodgingId === undefined) noGuest = false;
  noGuest = true;


  const getDatesInRange = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = new Date(start.getTime());
    const dates = [];

    while (nights <= end) {
      dates.push(new Date(nights).getTime());
      nights.setDate(nights.getDate() + 1);
    }

    console.log(typeof(dates))

    return dates;
  };
  const alldates = getDatesInRange(checkIn, checkOut);

  const [input, setInput] = useState({

    checkIn: checkIn,
    checkOut: checkOut,
    night: alldates.length,
    guests: 2,
    allDates: alldates,
    email: userEmail,
    lodgingId: lodgingId

  });

  const handleChangeInput = (e)=>{
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
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
            <div>{`${checkIn} - ${checkOut}`}</div>
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
            <Link to= {`/${lodgingId}`}>
            <button onClick={handleBooking}>
              Reservar
            </button>
            </Link>
            <MercadoPago lodId={lodgingId} night={input.night} costNight={costNight}/>
          </div>
        </div>
      )}
    </div>
  );
}
