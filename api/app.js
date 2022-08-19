const express = require('express');
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
<<<<<<< HEAD
const routes = require('./routes/index.js');
const path = require('path')

require('./db.js');

const server = express();

const cors = require('cors')

const server = express();
require('./db.js');

server.use(routes);
server.name = 'API';

server.use(express.static(path.join(__dirname,"public")));
// server.use('/images', express.static('images'));

server.use(cors())
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use("/app", express.static("public"));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});




// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
}); 

module.exports = server;

