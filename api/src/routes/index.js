const { Router } = require('express');
const router = Router();
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


const guestReview = require('../routes/guestReview/guestReview')

router.use("/api/host", hostRoute);
router.use("/api/booking", bookingRoute); 
router.use("/api/guest", guestRoute); 
router.use("/api/login", loginRoute); 
router.use("/api/login/google", loginGoogle); 
router.use("/api/lodging", lodgingRoute); 
router.use("/api/lodgingReview", lodgingReviewRoute); 
router.use("/api/guestReview", guestReviewRoute); 
router.use("/api/favorite", favoriteRoute);  





module.exports = router;