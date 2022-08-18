const express = require ("express");
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
const morgan = require ("morgan"); 
const app = express();

dotenv.config();
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority;`
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority;`

mongoose.connect(uri,
    (err)=>{
    if(err){
        console.log("********ERROR DE CONEXION****")
    }else{
        console.log("********CONEXION CORRECTA****")
    }
});
