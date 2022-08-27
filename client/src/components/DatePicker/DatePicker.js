import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail, settingDate } from "../../Redux/Actions";
import styles from "./DatePicker.module.css";

export default function DatePickerOk() {
  console.log("aqui");
  const lodging = useSelector((state) => state.detail);
  console.log(lodging)
  const lodgingId = lodging._id;
  const price = lodging.price;
  console.log(lodgingId);
  const [info, setInfo] = useState({
    startDate: new Date(),
    endDate: new Date(),
    price: price,
    guest: 3,
    pets: 0
  });
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(lodgingId));
  }, [dispatch]);

  function handleDecrement(e){
    e.preventDefault();
   if(info.guest>0){
     setInfo({...info,
      guest: info.guest--})
      console.log(info.guest, 'decremento')
   }
   setInfo({...info,
    guest: info.guest})
  }
  function handleIncrement(e){
    e.preventDefault();
   if(info.guest<5){
     setInfo({...info,
      guest: info.guest++})
      console.log(info.guest, 'Incremento')
   }
   setInfo({...info,
    guest: info.guest})
  }

  
  function handleClick(e) {
    localStorage.setItem("bookingInfo", JSON.stringify(info));
    localStorage.setItem('priceBooking', JSON.stringify(price));
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
                <div className={styles._p03egf}>
                  <div className={styles._jro6t0}>
                    <div className={styles._19y8o0j}>
                      <div className={styles._7eq2v2}>Llegada</div>
                      <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={info.startDate}
                        onChange={(currentDate) =>
                          setInfo({ ...info, startDate: currentDate })
                        }
                        startDate={info.startDate}
                        endDate={info.endDate}
                      />
                      {console.log(info.startDate, "soy start")}
                    </div>
                    <div className={styles._19y8o0j}>
                      <div className={styles._7eq2v2}>Salida</div>
                      <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={info.endDate}
                        onChange={(currentDate) =>
                          setInfo({ ...info, endDate: currentDate })
                        }
                        selectsEnd
                        startDate={info.startDate}
                        minDate={info.startDate}
                      />
                      {console.log(info.endDate, "soy END")}
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
                      <div>{`${info.guest}`}</div>
                    </button>
                    <div className="dropdown-menu w-100 p-3">
                      <div className="d-flex flex-row">
                        <div className={styles.div_Guest_Description}>
                          <div>Huespedes</div>
                        </div>
                        <div className={styles.container_btn}>
                          <button onClick={handleDecrement}>-</button>
                          <div>{`${info.guest}`}</div>
                          <button onClick={handleIncrement}>+</button>
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div className={styles.div_Guest_Description}>
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
                    <Link to={`/${lodgingId}`}>
                      <button onClick={handleClick}>Reserva ahora</button>
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
