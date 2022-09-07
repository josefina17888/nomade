import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
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
import Swal from 'sweetalert'


export default function Booking(props) {
  const dispatch = useDispatch();

  //SELECT STATES FROM REDUX
  const availibity = useSelector((state) => state.bookings);
  const payment = useSelector((state) => state.bookings);

  //DECLARATION CONST FOR USE DATA
  const lodgingId = props.match.params._id;

  useEffect(() => {
    dispatch(getDetail(lodgingId));
  }, [dispatch]);
  const lodging = useSelector((state) => state.detail);
  const services= lodging.services

  //DECLARATION CONST FOR USE DATA
  const unavailableDates = availibity.map((e) =>
  e.allDates.map((d) => new Date(d).toDateString())
  );

  // PARSE INFO LOCAL STORAGE BOOKING INFO
  let costNight = JSON.parse(localStorage.getItem("priceBooking"))
    const bookingInfo = localStorage.getItem("bookingInfo");
    var checkIn = new Date(JSON.parse(bookingInfo).checkIn).toDateString();
    var checkOut = new Date(JSON.parse(bookingInfo).checkOut).toDateString();
    var check = JSON.parse(bookingInfo).pets
    var totalGuest = JSON.parse(bookingInfo).guests;


  //PARSE INFO LOCAL STORAGE USER INFO
    const guestInfo = localStorage.getItem("userInfo");
    if(guestInfo){
      var userEmail = JSON.parse(guestInfo).email;
    }

    //let userEmail = true;
  
  //GET RANGES OF DATES
    const alldates = getDatesInRange(checkIn, checkOut);
  
  //VER DISPONIBILIDAD DE DATES
    const unavailableDatesMap = unavailableDates.flat();
    const disabledDates = unavailableDatesMap.map((e) => new Date(e));
  //LODGING DETAIL
  //const costNight = lodging.price; 

  const picture = lodging.picture;
  const obj = Object.assign({}, picture);
  const picture1 = obj["0"];
  const city = lodging.city;
  const country = lodging.country;

  const makeRandomId= (length) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return result;
}

  const codeFunction = makeRandomId(10)
  //STATE BOOKING FINAL
  const [input, setInput] = useState({
    checkIn: checkIn,
    checkOut: checkOut,
    night: alldates.length,
    guests: totalGuest,
    allDates: alldates,
    email: userEmail,
    lodgingId: lodgingId,
    costNight: costNight,
    pets: check,
    hostId: lodging.hostId,
    currency: "USD",
    totalPrice: total,
    code: codeFunction
  });

 



  const allDates = getDatesInRange(input.checkIn, input.checkOut);
  //DATA JOSE
  const total = costNight * allDates.length;
  useEffect(()=>{
    setInput({...input, totalPrice:total})
  }, [])

  const [style, setStyle] = useState("className={s.cont}");
  
  const changeStyle = () => {
    setStyle("className={s.cont2}");
  };

  //GET Q PETS
  const lodgingServices = []
  for (const property in services) {
    if (services[property] === true) {
      lodgingServices.push(property);
    }
  }
  const pets = lodgingServices.filter(e=>e=== 'pets')

  function handleCheckBox(e) {
    setInput({ ...input, pets: e.target.checked });
  }


  //MERCADO PAGO
  //estado local para la preferenceId
  const [preferenceId, setPreferenceId] = useState("")
  async function getPreference (){
    try {
      const res = await axios.post("/api/payment/", input)
      let id = res.data;
      setPreferenceId(id)
    }catch(err){
      console.log(err)
    }
  }  


//ON CHANGE CHECK IN
function onChangeCheckIn(currentDate){
  let start = getDatesInRange(input.checkIn, input.checkOut)
  setInput({
    ...input,
    checkIn: new Date(currentDate).toDateString(),
    allDates: start,
    night: start.length,
    totalPrice: costNight * start.length
  })

}
useEffect(()=>{
  let start = getDatesInRange(input.checkIn, input.checkOut)
  setInput({
    ...input,
    allDates: start,
    night: start.length,
    totalPrice: costNight * start.length
  })
},[input.checkIn,input.checkOut])

//ON CHANGE CHECK OUT
function onChangeCheckOut(currentDate){
  let start = getDatesInRange(input.checkIn, input.checkOut)
  setInput({
    ...input,
    checkOut: new Date(currentDate).toDateString(),
    allDates: start,
    night: start.length,
    totalPrice: costNight * start.length
  })

}

  //FUNCTION HANDLE BOOKING
  function handleBooking() {
    setInput({...input,
      night : allDates.length,
      allDates: allDates
    })
    const isFound = unavailableDatesMap.some((date) =>
      allDates.includes(new Date(date).toDateString())
    );
    localStorage.setItem("booking", JSON.stringify(input));
    isFound ?  Swal(
      'No disponible','','error',{buttons:false,timer:3000}
    ) :
    preference !== undefined?  Swal(
      'Haz clic en el boton de pago','','warning',{buttons:false,timer:3000}
    ) :
    // dispatch(payBooking(input))
    getPreference(input)
  }
  
  //MERCADO PAGO
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
        <Link to="/login">
              <div> Debes registrarte</div>
        </Link>
    
      ) : (
      <div className={s.container4}>
          <div className={s.container}>
          <div className={s.margin}>
            <div className={s.titles}>Fechas de tu reservacion</div>
            <hr className={s.hr}></hr>
            <div>{`${new Date(input.checkIn).toLocaleDateString()} - ${new Date(
              input.checkOut
            ).toLocaleDateString()}`}</div>
            <div>
              <div className={s.div}>Edita tus fechas</div>
              <div>
                <div>
                  <div className={s.div}>Llegada</div>
                  <DatePicker
                    disabled ={preference !== undefined}
                    dateFormat="dd/MM/yyyy"
                    selected={new Date(input.checkIn)}
                    onChange={(currentDate) =>onChangeCheckIn(currentDate)
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
                  <div className={s.div}>Salida</div>
                  <DatePicker
                    disabled ={preference !== undefined}
                    dateFormat="dd/MM/yyyy"
                    selected={new Date(input.checkOut)}
                      onChange={(currentDate) =>onChangeCheckOut(currentDate)
                      }
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
              <h6 className={s.inputcheck}>Total </h6>
              <input
                type="number"
                defaultValue={totalGuest}
                min={1}
                max={lodging.guests}
              ></input>
            </div>
            <div className={s.selection2}>
              <h6 className={s.inputcheck}>Mascotas </h6><input type="checkbox" checked={input.pets} onChange={handleCheckBox} disabled={!pets.includes('pets')}></input>
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
                    ${input.totalPrice} por {input.night} noches
                  </h6>
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
            <button className={s.button2} onClick={handleBooking} onmouseover={changeStyle}>
              Reservar
            </button>
          </div>
          </div>
          <MercadoPagoFinal preferenceId={preference} />                     
        </div>

      )}
    </div>
  );
}