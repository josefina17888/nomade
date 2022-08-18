const { Router } = require('express');
const router = Router();
var bodyParser = require('body-parser')


router.use(bodyParser.json()) 
router.use(bodyParser.urlencoded({ extended: true }))
const hostRoute = require ('../routes/host/host');
const bookingRoute = require ('../routes/booking/booking');

router.use("/api/host", hostRoute);
router.use("/api/booking", bookingRoute); 

module.exports = router;