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
  const lodgingId = lodging._id;
  console.log(lodgingId);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  console.log(date, "SOY DATE DEL PICKER");

  let guestId = localStorage.getItem("userInfo");
  if (guestId) {
    var userToken = JSON.parse(guestId).email;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(lodgingId));
  }, [dispatch]);


  function handleClickBooking(e) {
    dispatch(settingDate(date));
  }
  return (
    <div className={styles._1s21a6e2}>
      <div className="sticky-top">
        <div className="c1yo0219 dir dir-ltr">
          <div className={styles.card}>
            <div>
          <div>
            <h3>
              ${lodging.currency} {lodging.price} por noche
            </h3>
          </div>
          <div>
            <h6>Llegada</h6>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selected={date.startDate}
              onChange={(currentDate) =>
                setDate({ ...date, startDate: currentDate })
              }
              startDate={date.startDate}
              endDate={date.endDate}
            />
            {console.log(date.startDate, "soy start")}
          </div>
          <div>
            <h6>Salida</h6>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selected={date.endDate}
              onChange={(currentDate) =>
                setDate({ ...date, endDate: currentDate })
              }
              selectsEnd
              startDate={date.startDate}
              minDate={date.startDate}
            />
            {console.log(date.endDate, "soy END")}
          </div>
          <div>
            <h6>Huéspedes</h6>
            <form>
              <input type="text"></input>
            </form>
          </div>
          <div>
            {
              <Link to={`/${lodgingId}`}>
                <button onClick={(e) => handleClickBooking(e)}>
                  Reserva ahora
                </button>
              </Link>
            }
          </div>
          </div>
          </div>
        </div>

      </div>
    </div>
  );
}
