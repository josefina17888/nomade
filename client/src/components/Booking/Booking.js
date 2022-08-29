import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail, createNewBooking, getBookingByLodgingId, payBooking } from "../../Redux/Actions/index";
import Logo from "../../assets/nomadeLogo.svg";
import s from "../Booking/Booking.module.css";
import MercadoPago from "../MercadoPago/MercadoPago";
import getDatesInRange from "../Booking/controller";
import MercadoPagoFinal from "../MercadoPago/MercadoPagoFinal";


export default function Booking(props) {
  //SELECT STATES FROM REDUX
  const dispatch = useDispatch();

  const availibity = useSelector((state) => state.bookings);
  //DECLARATION CONST FOR USE DATES
  const lodgingId = props.match.params._id;
  const avalaibleDates = availibity.map((e) =>
    e.allDates.map((d) => new Date(d).toDateString())
  );

  useEffect(() => {
    dispatch(getDetail(lodgingId));
  }, [dispatch]);

  const lodging = useSelector((state) => state.detail);
  console.log(lodging)
  const costNight = lodging.price;
  const picture = lodging.picture;
  const obj = Object.assign({}, picture);
  const picture1 = obj["0"];
  const city = lodging.city
  const country = lodging.country

  // PARSE INFO LOCAL STORAGE BOOKING INFO
  const bookingInfo = localStorage.getItem("bookingInfo");
  var preCheckIn = JSON.parse(bookingInfo).checkIn;
  var preCheckOut = JSON.parse(bookingInfo).checkOut;
  var preGuest = JSON.parse(bookingInfo).guests;

  //PARSE INFO LOCAL STORAGE USER INFO
  const guestInfo = localStorage.getItem("userInfo");
  let userEmail = JSON.parse(guestInfo).email;
  //GET RANGES OF DATES
  const alldates = getDatesInRange(preCheckIn, preCheckOut);

  //NEW STATE WITH PROPERTIES FOR LOCAL STORAGE
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

  const night = input.night; 
  const info = {
    lodgingId,
     night,
     costNight
  }

  const total = costNight * night;

  //CONDITIONAL FOUND AVALABILITY
  if (availibity && availibity.length) {
    console.log(alldates.toString(), 'CONVIRTIENTO A STRIGN')
    const availibityMap = avalaibleDates.map(e=> e.toString())
    const datesString= alldates.toString();
    console.log(availibityMap, 'vengo del REDUX soy dates de los bokings')
    /*const allDatesMap = alldates.map( d => new Date( d ).getDate() );*/
    const filtradosPrueba = availibityMap.some(e=>e.includes(datesString));
    console.log(filtradosPrueba, 'POR FAVOR TRUE')
  }

  //HANDLE POST NEW BOOKING
  function handleBooking() {
    dispatch(createNewBooking(input));
    dispatch(payBooking(info));
  }

  const preferenceId = useSelector(state => state.payment)

  const preference = preferenceId.preferenceId

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
          <div className={s.margin}>
            <div className={s.titles}>Fechas de tu reservacion</div>
            <hr className={s.hr}></hr>
            <div>{`${input.checkIn} - ${input.checkOut}`}</div>
            <button className={s.button}>Editar fechas</button>
            <div className={s.titles}>Nómadas</div>
            <hr className={s.hr}></hr>
            <div className={s.selection}>
              <span>Total </span>
              <input
                type="number"
                name="adults"
                value={input.guestAdults}
                defaultValue={preGuest}
              ></input>
            </div>
            <div className={s.selection}>
              <span>Mascotas </span>
              <input type="checkbox" name="pets" value={input.pets}></input>
            </div>
          </div>
          <div className={s.card}>
            <div>
            <img src={picture1} className={s.img} alt="img not found"/>
            </div>
            <div>
              <h6 className={s.city}>{city}, {country}</h6>
            </div>
          <div className={s.container1}>
            <div className={s.container2}>
            <div>
              <h6 className={s.sub2}>Costo Total</h6>
              <h6 className={s.h1}>${total} por {night} noches</h6>
            </div>
            <div>
              <h6 className={s.sub1}>Comisión por servicio</h6>
              <h6 className={s.h}>$0</h6>
            </div>
            </div>
            <div className={s.container3}>
            <div>
              <h6 className={s.sub}>Fecha arribo</h6>
              <h6 className={s.h1}>{input.checkIn}</h6>
            </div>
            <div>
              <h6 className={s.sub1}>Fecha salida</h6>
              <h6 className={s.h}>{input.checkOut}</h6>
            </div>
            </div>
          </div>
            <button className={s.button2} onClick={handleBooking}>
              Reservar
            </button>

            {/* </Link> */}
            {/* <MercadoPago lodId={lodgingId} night={input.night} price={costNight}/> */}
            <MercadoPagoFinal preferenceId={preference}/>
          </div>
        </div>
      )}
    </div>
  );
}
