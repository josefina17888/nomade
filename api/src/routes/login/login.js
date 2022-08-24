const express = require("express");
const router = express.Router();
const Guest = require("../../models/Guest");
const jwt = require("jsonwebtoken");
const generateToken = require("../../utils/generateToken");

router.post("/", async (req, res) => {
  
  const { email, password } = req.body;

  const user = await Guest.findOne({ email });

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400).send("Invalid email or password");
  }
  
})

router.post("/auth", async (req, res) => {
  const { email , name , _id} = req.body;
  console.log( email)
  console.log(req.body)
  const user = await Guest.findOne({ email });
  console.log(user)
  // if(!user) { res.redirect("http://localhost:3000/api/guest")}
  if(!user) {
    // res.status(201).send("hola")
    try{
      console.log("hola")
      const newGuest = await Guest.create({email,name})
      console.log(newGuest)
      console.log("hola")
      res.send("ok")
    }
      catch (error){
          res.send("error")
      }
  
  } else {
    res.status(201).send("ya existe")
  }
  
})



module.exports = router