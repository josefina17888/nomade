const { Router } = require('express');
const router = Router();

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "APP_USR-4486395292185362-082416-e2f22c3627f37e6072a5bf9caaf72e09-1185632790",
});

var bodyParser = require('body-parser')
router.use(bodyParser.json()) 
router.use(bodyParser.urlencoded({ extended: true }))

const hostRoute = require ('../routes/host/host.js');
const bookingRoute = require ('../routes/booking/booking');
const lodgingRoute = require ('../routes/lodging/lodging');
const guestRoute = require ('../routes/guest/guest');
const loginRoute = require ('../routes/login/login');
const loginGoogle = require ('../routes/loginGoogle/loginGoogle');
const guestReviewRoute = require ('../routes/guestReview/guestReview.js')
const lodgingReviewRoute = require ('../routes/lodgingReview/lodgingReview.js')
const favoriteRoute = require ('../routes/favorite/favorite.js') 
const conversationRoute = require ('./chat/conversation') 
const messageRoute = require ('./chat/message.js') 
const passwordReset = require("./passwordReset/passwordReset")
const guestReview = require('../routes/guestReview/guestReview')
const paymentRoute = require('../routes/payment/payment')

router.use("/api/host", hostRoute);
router.use("/api/booking", bookingRoute); 
router.use("/api/guest", guestRoute); 
router.use("/api/login", loginRoute); 
router.use("/api/login/google", loginGoogle); 
router.use("/api/lodging", lodgingRoute); 
router.use("/api/lodgingReview", lodgingReviewRoute); 
router.use("/api/guestReview", guestReviewRoute); 
router.use("/api/payment", paymentRoute)
router.use("/api/favorite", favoriteRoute);
router.use("/api/conversation", conversationRoute);
router.use("/api/message", messageRoute);
router.use("/api/passwordReset", passwordReset);







module.exports = router;