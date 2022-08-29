const express = require("express");
const router = express.Router();
const Token = require("../../models/Token")
const {verifyEmail} = require("../../../libs/sendEmail");
const generateToken = require("../../utils/generateToken");
const Guest = require("../../models/Guest");

router.post("/" , async (req, res) => {
    let guest = await Guest.findOne({email: req.body.email})
    if(!guest) {
        return res.status(409).send({message: "Tu email no esta registrado"})
    }
    let token = await Token.findOne({userId: guest._id})
    if(!token) {
        token = await new Token({
            userId: guest._id,
            token: generateToken(guest._id)
        }).save()
    }
    const url = `${process.env.BASE_URL}api/passwordReset/${guest._id}/${token.token}`;
    const title = "Tranquilo Nómade, todo esto por tu seguridad"
    const msg = "Estas a unos pasos de ingresar tu nueva contraseña. Sólo da click al boton de abajo."
    await verifyEmail(guest.email,"Password Reset", title , msg , url)
    // res.status(201).send({message: "Revisa tu email para verificar tu cuenta"})
    res.status(201).send("Revisa tu correo")

})

router.get("/:_id/:token", async (req, res) => {
    try {
      const guest = await Guest.findOne({_id: req.params._id})
      if(!guest) return(400).send({message:"Invalid link"});
      const token = await Token.findOne({
        userId: guest._id,
        token: req.params.token
      });
      if(!token) return res.status(400).send({message: "invalid link"})
      await token.remove()
      // res.status(200).send({message: "Email verificado"})
      res.status(200).redirect(`http://localhost:3000/${req.params._id}/resetPassword/${req.params.token}`)
    }
    catch(error) {
      res.status(404).send(error)
    }
  
  })


  router.patch("/newPassord/:_id/:token", async(req,res) => {
    const guest = await Guest.findById(req.params._id)
    guest.password = req.body.passwordOne
    guest.save()
    res.send("Contraseña actualizada")
  })

  router.patch("/newPassordLogIn/:email", async(req,res) => {
    const guest = await Guest.findOne({email: req.params.email})
    guest.password = req.body.passwordOne
    guest.save()
    res.send("Contraseña actualizada")
  })

module.exports = router
