import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getBookingByLodgingId,
  getDetail,
  settingDate,
} from "../../Redux/Actions";
import styles from "./DatePicker.module.css";

export default function DatePickerOk({ lodId }) {
  const lodging = useSelector((state) => state.detail);
  const lodgingId = lodging._id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(lodgingId));
  }, [dispatch]);

  const price = lodging.price;
  const [info, setInfo] = useState({
    lodgingId: lodId,
    checkIn: new Date(),
    checkOut: new Date(),
    guests: 3,
    pets: 0,
  });

  //FUNCTION DECREMENT
  function handleDecrement(e) {
    e.preventDefault();
    if (info.guests > 0) {
      setInfo({ ...info, guests: info.guests-- });
    }
    setInfo({ ...info, guests: info.guests });
  }

  //FUNCTION INCREMENT
  function handleIncrement(e) {
    e.preventDefault();
    if (info.guests < 5) {
      setInfo({ ...info, guests: info.guests++ });
    }
    setInfo({ ...info, guests: info.guests });
  }

  async function handleClick(e) {
    setInfo({
      ...info,
      checkIn: info.checkIn,
      checkOut: info.checkOut,
    });
    localStorage.setItem("bookingInfo", JSON.stringify(info));
    localStorage.setItem("priceBooking", JSON.stringify(price));
    await dispatch(getBookingByLodgingId(info));
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
                        selected={info.checkIn}
                        onChange={(currentDate) =>
                          setInfo({ ...info, checkIn: currentDate })
                        }
                        checkIn={info.checkIn}
                        checkOut={info.checkOut}
                      />
                    </div>
                    <div className={styles._19y8o0j}>
                      <div className={styles._7eq2v2}>Salida</div>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={info.checkOut}
                        onChange={(currentDate) =>
                          setInfo({ ...info, checkOut: currentDate })
                        }
                        selectsEnd
                        checkIn={info.checkIn}
                        minDate={info.checkIn}
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
                          <button onClick={handleDecrement}>-</button>
                          <div>{`${info.guests}`}</div>
                          <button onClick={handleIncrement}>+</button>
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div className={styles.div_guests_Description}>
                          <div>Mascota</div>
                        </div>
                        <div className={styles.container_btn}>
                          <button>Sí</button>
                          <button>No</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    <Link to={`/booking/${lodgingId}`}>
                      <button onClick={handleClick}>Disponibilidad</button>
                    </Link>
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
