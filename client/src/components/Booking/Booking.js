import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail, createNewBooking, payBooking, setDataPostBooking } from "../../Redux/Actions/index";
import Logo from "../../assets/nomadeLogo.svg";
import s from "../Booking/Booking.module.css";
import getDatesInRange from "../Booking/controller";
import MercadoPagoFinal from "../MercadoPago/MercadoPagoFinal";
import ReactDatePicker from "react-datepicker";
import { DateRange } from "react-date-range";

export default function Booking(props) {
  //SELECT STATES FROM REDUX
  const dispatch = useDispatch();

  const availibity = useSelector((state) => state.bookings);

  //DECLARATION CONST FOR USE DATES
  const lodgingId = props.match.params._id;
  const unavailableDates = availibity.map((e) =>
    e.allDates.map((d) => new Date(d).toDateString())
  );

  useEffect(() => {
    dispatch(getDetail(lodgingId));
  }, [dispatch]);

  const lodging = useSelector((state) => state.detail);
  console.log(lodging);
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
  var preGuest = JSON.parse(bookingInfo).guests;

  //PRICE FROM LOCAL STORAGE
  //const costNight = JSON.parse(priceBooking);

  //PARSE INFO LOCAL STORAGE USER INFO
  const guestInfo = localStorage.getItem("userInfo");
  let userEmail = JSON.parse(guestInfo).email;
  //let userEmail = true;

  //GET RANGES OF DATES
  const alldates = getDatesInRange(checkIn, checkOut);
  console.log(alldates, "RANGO DE FECHAS QUE DESEA EL GUEST");
  //NEW STATE WITH PROPERTIES FOR LOCAL STORAGE
  const [input, setInput] = useState({
    checkIn: checkIn,
    checkOut: checkOut,
    night: alldates.length,
    guests: preGuest,
    allDates: alldates,
    email: userEmail,
    lodgingId: lodgingId,
    costNight: costNight,
  });

  const [objectDemo, setObjectDemo] = useState([
    {
      startDate: new Date(checkIn),
      endDate: new Date(checkOut),
      key: "selection",
    },
  ]);

  //VER DISPONIBILIDAD DE DATES
  const demo = unavailableDates.flat();
  const isFound = demo.some((date) =>
    alldates.includes(new Date(date).toDateString())
  );

  //DATA JOSE
  const night = input.night;
  const info = {
    lodgingId,
    night,
    costNight
  };

  const total = costNight * night;

  //FUNCTION HANDLE BOOKING
  function handleBooking() {
    isFound ? alert("NO DISPONIBLE") : dispatch(setDataPostBooking(input));
    dispatch(payBooking(info));
    //dispatch(setDataPostBooking(input));
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
          <div className={s.margin}>
            <div className={s.titles}>Fechas de tu reservacion</div>
            <hr className={s.hr}></hr>
            <div>{`${new Date(input.checkIn).toLocaleDateString()} - ${new Date(
              input.checkOut
            ).toLocaleDateString()}`}</div>
            <div>
              <div>Edita tus fechas</div>
              <div>
                {/* <div>
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
                    onSelect={new Date(input.checkIn)}
                    selectsRange={newDate()}
                    selectsEnd
                    minDate={new Date()}
                    checkIn={input.checkIn}
                    checkOut={info.checkOut} 
                  />
                </div> */}
                {/* <div>
                  <div>Llegada 2</div>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setObjectDemo([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={objectDemo}
                    className={s.date}
                    minDate={new Date()}
                  />
                </div> */}
                <div>
                  <h1>Type 2</h1>
                  <DateRange />
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
                    ${total} por {night} noches
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
          </div>
        </div>
      )}
    </div>
  );
}
