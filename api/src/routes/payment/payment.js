const express = require("express")
const router = express.Router()

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "APP_USR-4486395292185362-082416-e2f22c3627f37e6072a5bf9caaf72e09-1185632790",
});


router.post("/", async function (req, res, next) {
   
    // Crea un objeto de preferencia
let preference = {
    items: [{
        title: "Casa en Carrasco",
        description: "alojamiento",
        picture_url: "http://res.cloudinary.com/dbq85fwfz/image/upload/v1661183800/rsa9yxkermkod7jj04v5.jpg",
        category_id: "cat123",
        quantity: 5,
        unit_price: 50
    }],
    back_urls: {
        success: "http://localhost:3001/api/payment/feedback",
        failure: "http://localhost:3001/api/payment/feedback",
        pending: "http://localhost:3001/api/payment/feedback"
    },
  };

    try {
    const response = await mercadopago.preferences.create(preference)
    const preferenceId = response.body.id
    res.send({ preferenceId });
    } catch (error) {
        console.log(error)
    }
})

router.get('/feedback', function(req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

module.exports = router;
  