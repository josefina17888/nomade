// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { createNewBooking, getBookingByLodgingId, payBooking } from "../../Redux/Actions/index";
// import Logo from "../../assets/nomadeLogo.svg";
// import s from "../Booking/Booking.module.css";
// import MercadoPago from "../MercadoPago/MercadoPago";
// import getDatesInRange from "../Booking/controller";
// import MercadoPagoFinal from "../MercadoPago/MercadoPagoFinal";


// export default function Booking(props) {
//   //SELECT STATES FROM REDUX
//   const dispatch = useDispatch();
//   const lodging = useSelector((state) => state.detail);
//   const availibity = useSelector((state) => state.bookings);
//   //DECLARATION CONST FOR USE DATES
//   const costNight = lodging.price;
//   const lodgingId = props.match.params._id;
//   const avalaibleDates = availibity.map((e) =>
//     e.allDates.map((d) => new Date(d).toDateString())
//   );

//   // PARSE INFO LOCAL STORAGE BOOKING INFO
//   const bookingInfo = localStorage.getItem("bookingInfo");
//   if(bookingInfo){
//     var preCheckIn = JSON.parse(bookingInfo).checkIn;
//     var preCheckOut = JSON.parse(bookingInfo).checkOut;
//     var preGuest = JSON.parse(bookingInfo).guests;
//   }
 

//   //PARSE INFO LOCAL STORAGE USER INFO
//   const guestInfo = localStorage.getItem("userInfo");
//   if(guestInfo) {
//     let userEmail = JSON.parse(guestInfo).email;
//   //GET RANGES OF DATES
//   const alldates = getDatesInRange(preCheckIn, preCheckOut);
//   }
  

//   //NEW STATE WITH PROPERTIES FOR LOCAL STORAGE
//   const [input, setInput] = useState({
//     checkIn: preCheckIn,
//     checkOut: preCheckOut,
//     night:  alldates ? alldates.length : "",
//     guests: preGuest,
//     allDates: alldates ? alldates : "",
//     email: userEmail? userEmail : "",
//     lodgingId: lodgingId,
//   });

//   /* const handleChangeInput = (e)=>{
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value
//     })
//   }*/

//   const night = input.night; 
//   const info = {
//     lodgingId,
//      night,
//      costNight
//   }

//   function handleBooking() {

//   //CONDITIONAL FOUND AVALABILITY
//   if (availibity && availibity.length) {
//     console.log(alldates.toString(), 'CONVIRTIENTO A STRIGN')
//     const availibityMap = avalaibleDates.map(e=> e.toString())
//     const datesString= alldates.toString();
//     console.log(availibityMap, 'vengo del REDUX soy dates de los bokings')
//     /*const allDatesMap = alldates.map( d => new Date( d ).getDate() );*/
//     const filtradosPrueba = availibityMap.some(e=>e.includes(datesString));
//     console.log(filtradosPrueba, 'POR FAVOR TRUE')
//   }

//   //HANDLE POST NEW BOOKING
//   function handleBooking() {
//     dispatch(createNewBooking(input));
//     dispatch(payBooking(info));
//   }

//   const preferenceId = useSelector(state => state.payment)

//   const preference = preferenceId.preferenceId

//   return (
//     <div>
//       <div className={s.nav}>
//         <div className={s.div_logo}>
//           <Link to="/" className="c13cw3wj cbavvlr dir dir-ltr">
//             <div className="l10sdlqs dir dir-ltr">
//               <img
//                 alt="bg-button"
//                 src={Logo}
//                 className={s.logo}
//                 width="150"
//                 height="60"
//               />
//             </div>
//           </Link>
//         </div>
//       </div>
//       {!userEmail ? (
//         <div> Debes registrarte</div>
//       ) : (
//         <div className={s.container}>
//           <div>
//             <div>Fechas de tu reservacion</div>
//             <div>{`${input.checkIn} - ${input.checkOut}`}</div>
//             <button>Editar fechas</button>
//             <div>Nómadas</div>
//             <div>
//               <span>Total</span>
//               <input
//                 type="number"
//                 name="adults"
//                 value={input.guestAdults}
//                 defaultValue={preGuest}
//               ></input>
//             </div>
//             <div>
//               <span>Mascotas</span>
//               <input type="checkbox" name="pets" value={input.pets}></input>
//             </div>
//           </div>
//           <div>
//             AQUI VA LA CARD
//             {/* <Link to="/MercadoPago">
//               <button onClick={handleBooking}>Reservar</button>
//               </Link>
//             <Link to= {`/${lodgingId}`}> */}

//             <button onClick={handleBooking}>
//               Reservar
//             </button>

//             {/* </Link> */}
//             {/* <MercadoPago lodId={lodgingId} night={input.night} price={costNight}/> */}
//             <MercadoPagoFinal preferenceId={preference}/>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// }
