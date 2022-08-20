const express = require ("express");
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");

dotenv.config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const uri= `mongodb+srv://nabil:1234@cluster0.7vhfvxb.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri,
    (err)=>{
    if(err){
        console.log("********ERROR DE CONEXION****")
    }else{
        console.log("********CONEXION CORRECTA****")
    }
});

module.exports = mongoose;