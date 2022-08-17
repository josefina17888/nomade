 const { Router } = require('express');
const hostRoute = require ('./src/routes/host')
const bookingRoute = require ('./src/routes/booking')
const router = Router();



  middleware
  app.use(express.json());
  app.use(morgan("common"));


  app.use("/api/host", hostRoute);
  app.use("/api/booking", bookingRoute); 

  