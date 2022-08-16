const { Router } = require('express');
const router = Router();

/* router.get('/', (req, res) =>{
  res.send('Hello world!')
}) */
const hostRoute = require ('./host');
const bookingRoute = require ('./booking');

router.use("/api/host", hostRoute);
router.use("/api/booking", bookingRoute); 

module.exports = router;