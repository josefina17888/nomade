import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.css"

export default function DatePickerOk (){
    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));
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
    </div>

)}

