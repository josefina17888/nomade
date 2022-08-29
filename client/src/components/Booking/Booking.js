import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createNewBooking,
  getBookingByLodgingId,
  payBooking,
} from "../../Redux/Actions/index";
import Logo from "../../assets/nomadeLogo.svg";
import s from "../Booking/Booking.module.css";
import MercadoPago from "../MercadoPago/MercadoPago";
import getDatesInRange from "../Booking/controller";
import MercadoPagoFinal from "../MercadoPago/MercadoPagoFinal";
import ReactDatePicker from "react-datepicker";

export default function Booking(props) {
  //SELECT STATES FROM REDUX
  const dispatch = useDispatch();
  const lodging = useSelector((state) => state.detail);
  const availibity = useSelector((state) => state.bookings);

  //DECLARATION CONST FOR USE DATES
  const lodgingId = props.match.params._id;
  const unavailableDates = availibity.map((e) =>
    e.allDates.map((d) => new Date(d).toDateString())
  );

  // PARSE INFO LOCAL STORAGE BOOKING INFO
  const bookingInfo = localStorage.getItem("bookingInfo");
  var checkIn = new Date(JSON.parse(bookingInfo).checkIn).toDateString();
  var checkOut = new Date(JSON.parse(bookingInfo).checkOut).toDateString();
  var preGuest = JSON.parse(bookingInfo).guests;

  //PRICE FROM LOCAL STORAGE
  const priceBooking = localStorage.getItem("priceBooking");
  const costNight = JSON.parse(priceBooking);

  //PARSE INFO LOCAL STORAGE USER INFO
  const guestInfo = localStorage.getItem("userInfo");
  let userEmail = JSON.parse(guestInfo).email;
  //let userEmail = true;

  //GET RANGES OF DATES
  const alldates = getDatesInRange(checkIn, checkOut);
  console.log(alldates, 'RANGO DE FECHAS QUE DESEA EL GUEST')
  //NEW STATE WITH PROPERTIES FOR LOCAL STORAGE
  const [input, setInput] = useState({
    checkIn: checkIn,
    checkOut: checkOut,
    night: alldates.length,
    guests: preGuest,
    allDates: alldates,
    email: userEmail,
    lodgingId: lodgingId,
    costNight: costNight
  });

  
  //VER DISPONIBILIDAD DE DATES
  const demo = unavailableDates.flat()
  const isFound = demo.some((date) =>
      alldates.includes(new Date(date).toDateString()))

  //FUNCTION HANDLE BOOKING
  function handleBooking() {
    isFound? alert('NO DISPONIBLE'):
    dispatch(createNewBooking(input));
    //dispatch(payBooking(info));
  }

  function handleEditDates() {}

  const preferenceId = useSelector((state) => state.payment);
  const preference = preferenceId.preferenceId;

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
      {!userEmail ? (
        <div> Debes registrarte</div>
      ) : (
        <div className={s.container}>
          <div>
            <div>Fechas de tu reservacion</div>
            <div>{`${new Date(input.checkIn).toLocaleDateString()} - ${new Date(
              input.checkOut
            ).toLocaleDateString()}`}</div>
            <div>
              <div>Edita tus fechas</div>
              <div>
                <div>
                  <div>Llegada</div>
                  <ReactDatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={new Date(input.checkIn)}
                    onChange={(currentDate) =>
                      setInput({
                        ...input,
                        checkIn: new Date(currentDate).toDateString(),
                      })
                    }
                    selectsEnd
                    minDate={new Date()}
                    checkIn={input.checkIn}
                    /*checkOut={info.checkOut} */
                  />
                </div>
                <div>
                  <div>Salida</div>
                  <ReactDatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={new Date(input.checkOut)}
                    onChange={(currentDate) =>
                      setInput({
                        ...input,
                        checkOut: new Date(currentDate).toDateString(),
                      })
                    }
                    /*checkIn={info.checkIn}*/
                    checkIn={input.checkIn}
                    selectsEnd
                    checkOut={input.checkOut}
                    minDate={new Date(input.checkIn)}
                  />
                </div>
              </div>
            </div>
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
            {/* <Link to="/MercadoPago">
              <button onClick={handleBooking}>Reservar</button>
              </Link>
            <Link to= {`/${lodgingId}`}> */}
            <button onClick={handleBooking}>Reservar</button>
            {/* </Link> */}
            {/* <MercadoPago lodId={lodgingId} night={input.night} price={costNight}/> */}
            {/* <MercadoPagoFinal preferenceId={preference}/> */}
          </div>
        </div>
      )}
    </div>
  );
}
