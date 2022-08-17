const { Router } = require('express');
const router = Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

router.use(cookieParser());
router.use(bodyParser.json())


const hostRoute = require ('../routes/host/host');
const bookingRoute = require ('../routes/booking/booking');
const guestRoute = require ('../routes/guest/guest');

router.use("/api/host", hostRoute);
router.use("/api/booking", bookingRoute); 
router.use("/api/guest", guestRoute); 

module.exports = router;