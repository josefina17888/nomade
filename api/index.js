const express = require ("express");

const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
const morgan = require ("morgan"); 

const app = express();

dotenv.config();

require('./db');

const { Router } = require('express');
const hostRoute = require ('./src/routes/host')
const bookingRoute = require ('./src/routes/booking')
const guestRoute = require ('./src/routes/guest')

  //middleware
  app.use(express.json());
  app.use(morgan("common"));

  app.use("/api/host", hostRoute);
  app.use("/api/booking", bookingRoute);
  app.use("/api/guest", guestRoute);
 







app.listen(3000, ()=> {console.log ("listening on port 3000")})