 const Router = require('express');
const router = Router();

const bodyParser = require('body-parser')

// app.use(express.json());
// app.use(morgan("common"));
router.use(bodyParser.json()) 
router.use(bodyParser.urlencoded({ extended: true }))

const hostRoute = require ('../routes/host/host');
const bookingRoute = require ('../routes/booking/booking');
const lodgingRoute = require ('../routes/lodging/lodging');
const guestRoute = require ('../routes/guest/guest');
const guestReviewRoute = require ('../routes/guestReview/guestReview.js')
const lodgingReviewRoute = require ('../routes/lodgingReview/lodgingReview.js')

router.use("/api/host", hostRoute);
router.use("/api/booking", bookingRoute); 
router.use("/api/guest", guestRoute); 
router.use("/api/lodging", lodgingRoute); 
router.use("/api/lodgingReview", lodgingReviewRoute); 
router.use("/api/guestReview", guestReviewRoute); 

module.exports = router;
