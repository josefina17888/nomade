const { Router } = require('express');
const router = Router();
var bodyParser = require('body-parser')

router.use(bodyParser.json()) 
router.use(bodyParser.urlencoded({ extended: true }))

/* router.get('/', (req, res) =>{
  res.send('Hello world!')
}) */
const hostRoute = require ('../routes/host/host');
const bookingRoute = require ('../routes/booking/booking');
const guestReviewRoute = require ('../routes/guestReview/guestReview.js')

router.use("/api/host", hostRoute);
router.use("/api/booking", bookingRoute); 
router.use("/api/guestReview", guestReviewRoute);

module.exports = router;