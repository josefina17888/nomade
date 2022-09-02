import { end } from "@popperjs/core";
import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getBookingByLodgingId,
  getDetail,
  settingDate,
} from "../../Redux/Actions";
import styles from "./DatePicker.module.css";
import getDatesInRange from "../Booking/controller";

export default function DatePickerOk({ lodId }) {
  //SELECT STATES FROM REDUX
  const availibity = useSelector((state) => state.bookings);
  const lodging = useSelector((state) => state.detail);
  const services = lodging.services;
  const lodgingId = lodging._id;
  const price = lodging.price;
  const dispatch = useDispatch();
  const history = useHistory();
  const [info, setInfo] = useState({
    lodgingId: lodId,
    checkIn: new Date(),
    checkOut: new Date(),
    guests: 1,
    pets: false,
  });

  useEffect(() => {
    dispatch(getDetail(lodgingId));
    dispatch(getBookingByLodgingId(info));
  }, [dispatch]);

  //GET INFO GUEST
  const guestInfo = localStorage.getItem("userInfo");
  let user = JSON.parse(guestInfo);

  //AVAILIBITY LODGINGS
  const unavailableDates = availibity.map((e) =>
    e.allDates.map((d) => new Date(d).toDateString())
  );
  const unavailableDatesMap = unavailableDates.flat();
  const disabledDates = unavailableDatesMap.map((e) => new Date(e));

  //GET Q PETS
  const lodgingServices = [];
  for (const property in services) {
    if (services[property] === true) {
      lodgingServices.push(property);
    }
  }
  const pets = lodgingServices.filter((e) => e === "pets");

  //FUNCTION DECREMENT
  function handleDecrement(e) {
    e.preventDefault();
    if (info.guests > 1) {
      setInfo({ ...info, guests: info.guests-- });
    }
    setInfo({ ...info, guests: info.guests });
  }

  //FUNCTION INCREMENT
  function handleIncrement(e) {
    e.preventDefault();
    if (info.guests < lodging.guests) {
      setInfo({ ...info, guests: info.guests++ });
    }
    setInfo({ ...info, guests: info.guests });
  }

  function handleCheckBox(e) {
    setInfo({ ...info, pets: e.target.checked });
  }

  async function handleClick(e) {
    const alldates = getDatesInRange(info.checkIn, info.checkOut);
    const isFound = unavailableDatesMap.some((date) =>
      alldates.includes(new Date(date).toDateString())
    );
    if(isFound){
      return alert('Fecha no disponible')
    }else{
      localStorage.setItem("bookingInfo", JSON.stringify(info));
      localStorage.setItem("priceBooking", JSON.stringify(price));
      dispatch(getBookingByLodgingId(info));
      if(user){
        history.push(`/booking/${lodgingId}`)
      }else{
        history.push(`/login`)
      }
    }
  }

  return (
    <div className={styles._1s21a6e2}>
      <div className="sticky-top">
        <div className="c1yo0219 dir dir-ltr">
          <div className={styles.card}>
            <div className="_ud8a1c">
              <div className={styles._c7v1se}>
                <span className={styles._14y1gc}>
                  ${lodging.currency}
                  {lodging.price} noche
                </span>
                <div className={styles.review}>Ver reseñas</div>
                <div className={styles.review}>Tarifa de limpieza</div>
                <div className={styles.review}>Comisión por servicio</div>
              </div>
              <div>
                <div>Elige la fecha</div>
                <div className={styles._p03egf}>
                  <div className={styles._jro6t0}>
                    <div className={styles._19y8o0j}>
                      <div className={styles._7eq2v2}>Llegada</div>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={new Date(info.checkIn)}
                        onChange={(currentDate) =>
                          setInfo({
                            ...info,
                            checkIn: new Date(currentDate).toDateString(),
                          })
                        }
                        selectsStart
                        startDate={new Date(info.checkIn)}
                        endDate={new Date(info.checkOut)}
                        excludeDates={disabledDates}
                        selectsEnd
                        minDate={new Date()}
                      />
                    </div>
                    <div className={styles._19y8o0j}>
                      <div className={styles._7eq2v2}>Salida</div>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={new Date(info.checkOut)}
                        onChange={(currentDate) =>
                          setInfo({
                            ...info,
                            checkOut: new Date(currentDate).toDateString(),
                          })
                        }
                        selectsStart
                        startDate={new Date(info.checkIn)}
                        endDate={new Date(info.checkOut)}
                        excludeDates={disabledDates}
                        selectsEnd
                        minDate={new Date(info.checkIn)}
                      />
                    </div>
                  </div>
                  <div className="dropdown w-100">
                    <button
                      className={styles.dropdown}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <label className={styles._7eq2v2}>Huespedes</label>
                      <div>{`${info.guests}`}</div>
                    </button>
                    <div className="dropdown-menu w-100 p-3">
                      <div className="d-flex flex-row">
                        <div className={styles.div_guests_Description}>
                          <div>Huespedes</div>
                        </div>
                        <div className={styles.container_btn}>
                          {/* <button onClick={handleDecrement}>-</button>
                          <div>{`${info.guests}`}</div>
                          <button onClick={handleIncrement}>+</button> */}
                          <input
                            type="number"
                            name="adults"
                            min={1}
                            max={lodging.guests}
                            onChange={e => setInfo({...info, guests:e.target.value})}
                            defaultValue={info.guests}
                            ></input>
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div className={styles.div_guests_Description}>
                          <div>Mascota</div>
                          <input
                            type="checkbox"
                            checked={info.pets}
                            disabled={!pets.includes("pets")}
                            onChange={handleCheckBox}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {
                      <button onClick={(e) => handleClick(e)}>Continuar</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
