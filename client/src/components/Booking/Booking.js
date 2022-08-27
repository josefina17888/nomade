import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createNewBooking } from "../../Redux/Actions/index";
import Logo from "../../assets/nomadeLogo.svg";
import s from "../Booking/Booking.module.css";

export default function Booking(props) {
  const checkIn = useSelector((state) => state.checkIn);
  const checkOut = useSelector((state) => state.checkOut);
  const lodgingId = props.match.params._id;
  const guestInfo = localStorage.getItem("userInfo");
  let userEmail = JSON.parse(guestInfo).email;

  const bookingInfo = localStorage.getItem("bookingInfo");
  var preCheckIn = JSON.parse(bookingInfo).startDate;
  var preCheckOut = JSON.parse(bookingInfo).endDate;
  var preGuest = JSON.parse(bookingInfo).guest;
  console.log(preCheckIn, preCheckOut, preGuest);
  const dispatch = useDispatch();
  var noGuest = true;

  const getDatesInRange = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = new Date(start.getTime());
    const dates = [];

    while (nights < end) {
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
    lodgingId: lodgingId,
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
      <div className={s.nav}>
        <div className={s.div_logo}>
          <Link to="/" className="c13cw3wj cbavvlr dir dir-ltr">
            <div className="l10sdlqs dir dir-ltr">
              <img
                alt="bg-button"
                src={Logo}
                className={s.logo}
                width="150"
                height="60"
              />
            </div>
          </Link>
        </div>
      </div>
      {!noGuest ? (
        <div> Debes registrarte</div>
      ) : (
        <div className={s.container}>
          <div>
            <div>Fechas de tu reservacion</div>
            <div>{`${preCheckIn} - ${preCheckOut}`}</div>
            <button>Editar fechas</button>
            <div>Nómadas</div>
            <div>
              <span>Total</span>
              <input
                type="number"
                name="adults"
                value={input.guestAdults}
                defaultValue={preGuest}
              ></input>
            </div>
            <div>
              <span>Mascotas</span>
              <input type="checkbox" name="pets" value={input.pets}></input>
            </div>
          </div>
          <div>
            AQUI VA LA CARD
            <Link to="/MercadoPago">
              <button onClick={handleBooking}>Reservar</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
