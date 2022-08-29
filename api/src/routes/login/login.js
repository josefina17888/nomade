const express = require("express");
const router = express.Router();
const Guest = require("../../models/Guest");
const generateToken = require("../../utils/generateToken")
const Token = require("../../models/Token")
const sendEmail = require("../../../libs/sendEmail");


router.post("/", async (req, res) => {
  
  const { email, password } = req.body;
  const user = await Guest.findOne({ email });

  if(!user.verified){
    let token = await Token.findOne({userId: user._id})
    if(!token) {
      token = await new Token({
        userId: user._id,
        token: generateToken(user._id)
      })
      token.save()
      const url = `Dar click al siguiente enlace para verificar tu correo: ${process.env.BASE_URL}api/guest/${user._id}/verify/${token.token}, este token expira en una hora`;
      await sendEmail(user.email,"Verify Email", url)
    }
    return res
    .status(401)
    .send({message: "Revisa tu email para verificar tu cuenta"})
  }
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




module.exports = router