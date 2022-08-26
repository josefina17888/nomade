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


router.post("/:lodgingId/:night", async function (req, res, next) {
    //recibe un lodgingId
    const searchLodging = req.params.id;
    //recibe Q de nights
    const bookingData = req.params.night;
    //busca el lodging
    const lodgingPayed = await Lodging.findById (searchLodging);

    // Crea un objeto de preferencia (se le pueden poner muchas especificaciones como payer email por ej)
    // Toma del lodging el title y el unit price y toma del body la cantidad de noches
        let preference = {
            items: [{
                title: lodgingPayed.title,
                quantity: bookingData,
                unit_price: lodgingPayed.price,
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
  