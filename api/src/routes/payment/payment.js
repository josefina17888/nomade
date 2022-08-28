const express = require("express")
const router = express.Router()
const Booking = require("../../models/Booking")
const Lodging = require("../../models/Lodging")

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales


router.post("/", async function (req, res, next) {
    mercadopago.configure({
      access_token: "APP_USR-4486395292185362-082416-e2f22c3627f37e6072a5bf9caaf72e09-1185632790",
    });
    
    // const searchBooking = req.params.id;
    const bookingData = req.body
    //busca el booking
    // const bookingPayed = await Booking.findOne({_id: req.params.bookingId});
    // console.log(bookingPayed)
    // const title = req.body.lodId
    // const quantity = req.body.night
    // const price = 100
    // Crea un objeto de preferencia (se le pueden poner muchas especificaciones como payer email por ej)
    try {
        let preference = {
            items: [{
                title: req.body.lodId,
                quantity: req.body.night,
                unit_price: req.body.costNight,
            }],
            back_urls: {
                success: "http://localhost:3001/api/payment/",
                failure: "http://localhost:3001/api/payment/feedback",
                pending: "http://localhost:3001/api/payment/feedback"
            },
        }
    console.log(preference.items)

     mercadopago.preferences.create(preference)
    .then(function (response){
        res.json({
            preferenceId: response.body.id,
        })
    })
    // const preferenceId = response.body.id
    // console.log(preferenceId)
    // res.send({ preferenceId });

    } catch (error) {
        console.log(error)
    }

})



router.get('/', function(req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

module.exports = router;
  