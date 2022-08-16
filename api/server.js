const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser")
const morgan = require('morgan');
require("dotenv").config();
const db = require("./db")
const cors = require("cors")
const uri = `mongodb+srv://Nabil:1234@cluster0.ctyy9yf.mongodb.net/?retryWrites=true&w=majority`;

db(uri)

const router = require("./network/routes")

var app = express()
app.use(bodyParser.json())
app.use(morgan('dev'));

router(app)



app.use("/app", express.static("public"));

app.listen(3001);
console.log("La aplicacion esta escuchando en http://localhost:3001");

app.name = 'API';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});