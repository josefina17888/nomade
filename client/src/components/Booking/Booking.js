import { start } from "@popperjs/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewBooking } from "../../Redux/Actions/index";
import DatePickerOk from "../DatePicker/DatePicker";

export default function Booking(props) {
  const checkIn = useSelector((state) => state.checkIn);
  const checkOut = useSelector((state) => state.checkOut);
  const lodgingId = props.match.params.guestId;
  
  const dispatch = useDispatch();
  var noGuest = false;
  if (lodgingId === undefined) noGuest = false;
  noGuest = true;

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = new Date(start.getTime());
    const dates = [];

    while (nights <= end) {
      dates.push(new Date(nights).getTime());
      nights.setDate(nights.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDatesInRange(checkIn, checkOut);

  const [input, setInput] = useState({
    alldates: alldates,
    checkIn: checkIn,
    checkOut: checkOut,
    night: alldates.length,
    guestAdults: 2,
    guestMinors:1,
    pets: 0
  });

  const handleChangeInput = (e)=>{
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  function handleBooking() {
    dispatch(createNewBooking(alldates));
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
            <button onClick={handleBooking}>Reservar</button>
            
          </div>
        </div>
      )}
    </div>
  );
}
