
import React, { useEffect, useState }  from 'react';

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
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
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