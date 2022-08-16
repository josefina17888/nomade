
const express = require ("express");
const app = express();
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
const morgan = require ("morgan");
const hostRoute = require ('./components/routes/index')


dotenv.config();


mongoose.connect(process.env.MONGO_URL,
    (err)=>{
    if(err){
        console.log("********ERROR DE CONEXION****")
    }else{
        console.log("********CONEXION CORRECTA****")
    }
});

  //middleware
  app.use(express.json());
  app.use(morgan("common"));

 
  app.use("/api/host", hostRoute);


 








app.listen(3000, ()=> {console.log ("listening on port 3000")})


