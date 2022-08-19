const express = require ("express");
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");

dotenv.config();
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority;`
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority;`

<<<<<<< HEAD
=======

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

>>>>>>> f1f335b83f394f3be4b0bc84252d62d6b6274885
mongoose.connect(uri,
    (err)=>{
    if(err){
        console.log("********ERROR DE CONEXION****")
    }else{
        console.log("********CONEXION CORRECTA****")
    }
});
<<<<<<< HEAD
=======

module.exports = mongoose;
>>>>>>> f1f335b83f394f3be4b0bc84252d62d6b6274885
