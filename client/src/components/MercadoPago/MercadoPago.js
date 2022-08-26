import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";


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

const FORM_ID = 'payment-form';

export default function MercadoPago() {
  const { id } = useParams(); 
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    axios.post('/api/payment/:lodgingId/:night', { lodgingId: id }).then((payment) => {
      setPreferenceId(payment.preferenceId);
    });
  }, [id]);

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);

  return (
    <form id={FORM_ID} method="GET" />
  );
}