import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { payBooking } from "../../Redux/Actions/index";


// async function pay() {
//   try{
//       const preference = await (await fetch("/api/payment",{
//           method: "post",
//           body: JSON.stringify(items),
//           headers: {
//               "Content-Type": "application/json"
//           }
//       })).json();


//       var script = document.createElement("script");

//       script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
//       script.type = "text/javascript";
//       script.dataset.preferenceId = preference.preferenceId;
//       document.getElementById("page-content").innerHTML = "";
//       document.querySelector("#page-content").appendChild(script);

//   }
//   catch {
//       window.alert("Hubo un error");
//   }

//   document.getElementById("checkout").innerHTML = "Pagar"
// }

//const FORM_ID = 'payment-form';


export default function MercadoPago({lodgingId, night, costNight}) {
 
  const dispatch = useDispatch();
  const props = {
    lodgingId,
    night,
    costNight
  }
  console.log(props)

  useEffect(()=>{dispatch(payBooking(props))}, [dispatch])

  const preferenceId = useSelector(state => state.payment)
  console.log(preferenceId)
  // const { id } = useParams(); 
  // const [preferenceId, setPreferenceId] = useState(null);

  // useEffect(() => {
  //   // luego de montarse el componente, le pedimos al backend el preferenceId
  //   axios.post('/api/payment/:lodgingId/:night', { lodgingId: id }).then((payment) => {
  //     setPreferenceId(payment.preferenceId);
  //   });
  // }, [id]);

  // useEffect(() => {
  //   if (preferenceId) {
  //     // con el preferenceId en mano, inyectamos el script de mercadoPago
  //     const script = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src =
  //     "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
  //     script.setAttribute('data-preference-id', preferenceId);
  //     const form = document.getElementById(FORM_ID);
  //     form.appendChild(script);
  //   }
  // }, [preferenceId]);

  return (
    <div>
    {/* <form id={FORM_ID} method="GET" /> */}
      <p>Probando</p>

    </div>
  );
}