
const { Router } = require('express');
const express = require('express');
hostRoute = require("./host")
//const {getHost} = require("./host")


// Importar todos los routers;
//const Router = require('./host');



const router = Router();

// Configurar los routers
router.use('/host', hostRoute);
