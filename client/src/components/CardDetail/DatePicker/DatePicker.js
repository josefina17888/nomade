import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.css"
import { Link } from "react-router-dom";

export default function DatePickerOk (lodgingdId){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
return(
    <div className={styles.flexcontainer2}>
        <div className={styles.flexcontainer3}>
        <h6>Llegada</h6>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
    </div>
    <div className={styles.flexcontainer3}>
    <h6>Salida</h6>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
    </div>
    <div>
              <Link to= '/'>
                <button className={styles.button1}>Reservá ahora</button>
              </Link>
              </div>
    </div>

)}

