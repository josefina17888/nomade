<<<<<<< HEAD
 const { Router } = require('express');
const hostRoute = require ('./src/routes/host')
const bookingRoute = require ('./src/routes/booking')
=======
const { Router } = require('express');
>>>>>>> f1f335b83f394f3be4b0bc84252d62d6b6274885
const router = Router();

const bodyParser = require('body-parser')


<<<<<<< HEAD
  middleware
  app.use(express.json());
  app.use(morgan("common"));
=======
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
>>>>>>> f1f335b83f394f3be4b0bc84252d62d6b6274885



<<<<<<< HEAD
  
=======
module.exports = router;
>>>>>>> f1f335b83f394f3be4b0bc84252d62d6b6274885
