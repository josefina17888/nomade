import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDetail,
  createNewBooking,
  payBooking,
  setDataPostBooking,
} from "../../Redux/Actions/index";
import Logo from "../../assets/nomadeLogo.svg";
import s from "../Booking/Booking.module.css";
import getDatesInRange from "../Booking/controller";
import MercadoPagoFinal from "../MercadoPago/MercadoPagoFinal";
import DatePicker from "react-datepicker";

export default function Booking(props) {
  const dispatch = useDispatch();

  //SELECT STATES FROM REDUX
  const availibity = useSelector((state) => state.bookings);

  //DECLARATION CONST FOR USE DATA
  const lodgingId = props.match.params._id;
  const unavailableDates = availibity.map((e) =>
    e.allDates.map((d) => new Date(d).toDateString())
  );

  useEffect(() => {
    dispatch(getDetail(lodgingId));
  }, [dispatch]);

  const lodging = useSelector((state) => state.detail);
  const costNight = lodging.price;
  const picture = lodging.picture;
  const obj = Object.assign({}, picture);
  const picture1 = obj["0"];
  const city = lodging.city;
  const country = lodging.country;

  // PARSE INFO LOCAL STORAGE BOOKING INFO
  const bookingInfo = localStorage.getItem("bookingInfo");
  var checkIn = new Date(JSON.parse(bookingInfo).checkIn).toDateString();
  var checkOut = new Date(JSON.parse(bookingInfo).checkOut).toDateString();
  var totalGuest = JSON.parse(bookingInfo).guests;

  //PARSE INFO LOCAL STORAGE USER INFO
  const guestInfo = localStorage.getItem("userInfo");
  let userEmail = JSON.parse(guestInfo).email;
  //let userEmail = true;

  //GET RANGES OF DATES
  const alldates = getDatesInRange(checkIn, checkOut);

  //VER DISPONIBILIDAD DE DATES
  const unavailableDatesMap = unavailableDates.flat();
  const disabledDates = unavailableDatesMap.map((e) => new Date(e));
  const isFound = unavailableDatesMap.some((date) =>
    alldates.includes(new Date(date).toDateString())
  );

  const [input, setInput] = useState({
    checkIn: checkIn,
    checkOut: checkOut,
    night: alldates.length,
    guests: totalGuest,
    allDates: alldates,
    email: userEmail,
    lodgingId: lodgingId,
    costNight: lodging.price,
  });

  //DATA JOSE
  const total = costNight * input.night;

  //FUNCTION HANDLE BOOKING
  function handleBooking() {
    localStorage.setItem("booking", JSON.stringify(input));
    isFound ? alert("NO DISPONIBLE") : dispatch(setDataPostBooking());
    dispatch(payBooking(input));
    dispatch(setDataPostBooking(input));
  }

  //MERCADO PAGO
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
          <div className={s.margin}>
            <div className={s.titles}>Fechas de tu reservacion</div>
            <hr className={s.hr}></hr>
            <div>{`${new Date(input.checkIn).toLocaleDateString()} - ${new Date(
              input.checkOut
            ).toLocaleDateString()}`}</div>
            <div>
              <div>Edita tus fechas</div>
              <div>
                <div>
                  <div>Llegada</div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={new Date(input.checkIn)}
                    onChange={(currentDate) =>
                      setInput({
                        ...input,
                        checkIn: new Date(currentDate).toDateString(),
                      })
                    }
                    selectsStart
                    startDate={new Date(input.checkIn)}
                    endDate={new Date(input.checkOut)}
                    excludeDates={disabledDates}
                    selectsEnd
                        minDate={new Date()}
                  />
                </div>
                <div>
                  <div>Salida</div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={new Date(input.checkOut)}
                      onChange={(currentDate) =>
                        setInput({
                          ...input,
                          checkOut: new Date(currentDate).toDateString(),
                        })}
                      selectsStart
                      startDate={new Date(input.checkIn)}
                      endDate={new Date(input.checkOut)}
                      excludeDates={disabledDates}
                      selectsEnd
                      minDate={new Date(input.checkIn)}
                  />
                </div>
              </div>
            </div>
            <div className={s.titles}>Nómadas</div>
            <hr className={s.hr}></hr>
            <div className={s.selection}>
              <span>Total </span>
              <input
                type="number"
                name="adults"
                value={input.guestAdults}
                defaultValue={totalGuest}
              ></input>
            </div>
            <div className={s.selection}>
              <span>Mascotas </span>
              <input type="checkbox" name="pets" value={input.pets}></input>
            </div>
          </div>
          <div className={s.card}>
            <div>
              <img src={picture1} className={s.img} alt="img not found" />
            </div>
            <div>
              <h6 className={s.city}>
                {city}, {country}
              </h6>
            </div>
            <div className={s.container1}>
              <div className={s.container2}>
                <div>
                  <h6 className={s.sub2}>Costo Total</h6>
                  <h6 className={s.h1}>
                    ${total} por {input.night} noches
                  </h6>
                </div>
                <div>
                  <h6 className={s.sub1}>Comisión por servicio</h6>
                  <h6 className={s.h}>$0</h6>
                </div>
              </div>
              <div className={s.container3}>
                <div>
                  <h6 className={s.sub}>Fecha arribo</h6>
                  <h6 className={s.h1}>{new Date(input.checkIn).toLocaleDateString()}</h6>
                </div>
                <div>
                  <h6 className={s.sub1}>Fecha salida</h6>
                  <h6 className={s.h}>{new Date(input.checkOut).toLocaleDateString()}</h6>
                </div>
              </div>
            </div>
            <button className={s.button2} onClick={handleBooking}>
              Reservar
            </button>
            <MercadoPagoFinal preferenceId={preference} />
          </div>
        </div>
      )}
    </div>
  );
}