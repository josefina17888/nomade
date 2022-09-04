
import React, { useEffect, useState }  from 'react';
// import MercadoPago from "react-sdk-mercadopago"
const FORM_ID = 'payment-form';

export default function MercadoPagoFinal({preferenceId}) {

  useEffect(() => {
    // dispatch(payBooking(props))
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    //  "https://sdk.mercadopago.com/js/v2"
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    //   const mp = new MercadoPago('APP_USR-96a7b3a4-39d9-40fb-a0cc-ecfcccacc066', 
    // {locale: 'es-US'} )

    // mp.checkout({
    //   preference: {
    //     id: preferenceId
    //   },
    //   render: {
    //     container: '.cho-container',
    //     label: 'Pagar',
    //   }
    // })
  }
  }, [preferenceId]);

// if (preferenceId) {
//     // con el preferenceId en mano, inyectamos el script de mercadoPago
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src =
//     "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
//     script.setAttribute('data-preference-id', preferenceId);
//     const form = document.getElementById(FORM_ID);
//     form.appendChild(script);
//   }

  

return (
  <div>
  <form id={FORM_ID} method="GET" />
 
  </div>
)
}