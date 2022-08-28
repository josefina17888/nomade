// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from "react-router-dom";
// import { payBooking } from "../../Redux/Actions/index";
// // import { useMercadopago } from 'react-sdk-mercadopago';
// import MercadoPagoFinal from './MercadoPagoFinal';

// // const FORM_ID = 'payment-form';


// export default function MercadoPago({lodId, night, price}) {
 
//   const dispatch = useDispatch();
//   const props = {
//     lodId,
//     night,
//     price
//   }

//   function handlePayment() {

//     dispatch(payBooking(props));
//   }

//   // useEffect(() => {
//   //   dispatch(payBooking(props))}, [dispatch])

//   const preferenceId = useSelector(state => state.payment)

//   const preference = preferenceId.preferenceId
  
// // if (preference) {
// //       // con el preferenceId en mano, inyectamos el script de mercadoPago
// //       const script = document.createElement('script');
// //       script.type = 'text/javascript';
// //       script.src =
// //       "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
// //       script.setAttribute('data-preference-id', preference);
// //       const form = document.getElementById(FORM_ID);
// //       form.appendChild(script);
// //     }

//   return (
//     <div>
//     <button button onClick={handlePayment}>Confirmar</button>
//     <MercadoPagoFinal preferenceId={preference}/>
//     </div>
//   );

// }


