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
    const title = req.body.lodgingId
    const quantity = req.body.night
    const price = req.body.costNight
    console.log(price)
    // Crea un objeto de preferencia (se le pueden poner muchas especificaciones como payer email por ej)
    try {
        let preference = {
            items: [{
                title: req.body.lodId,
                quantity: req.body.night,
                unit_price: req.body.costNight,
            }],

            payment_methods: {
                installments: 1
            },
            back_urls: {
                success: "https://nomade-khaki.vercel.app/",
                //"http://localhost:3000/",
                // res.redirect("https://nomade-khaki.vercel.app/")
                failure: "https://nomade-khaki.vercel.app/",
                pending: "https://nomade-khaki.vercel.app/"
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


router.get('/', async function(req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

module.exports = router;
  