const express = require("express")
const router = express.Router()
const Booking = require("../../models/Booking")
const Lodging = require("../../models/Lodging")

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "APP_USR-4486395292185362-082416-e2f22c3627f37e6072a5bf9caaf72e09-1185632790",
});


router.post("/:bookingId", async function (req, res, next) {
    
    const searchBooking = req.params.id;
    const bookingData = req.body
    //busca el booking
    // const bookingPayed = await Booking.findOne({_id: req.params.bookingId});
    // console.log(bookingPayed)
    // const title = bookingPayed.lodgingId
    // const quantity = bookingPayed.night
    // const price = bookingPayed.costNight
    // Crea un objeto de preferencia (se le pueden poner muchas especificaciones como payer email por ej)
    // Toma del lodging el title y el unit price y toma del body la cantidad de noches
        let preference = {
            items: [{
                title: "6303a73bd591a8362a0c7f02",
                quantity: 5,
                unit_price: 200,
            }],
            back_urls: {
                success: "http://localhost:3001/api/payment/feedback",
                failure: "http://localhost:3001/api/payment/feedback",
                pending: "http://localhost:3001/api/payment/feedback"
            },
        }
    

    try {
    const response = await mercadopago.preferences.create(preference)
    const preferenceId = response.body.id
    console.log(response)
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
  