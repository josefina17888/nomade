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



module.exports = router


// try {
//   const user = await Guest.findOne({
//     email: req.body.email,
//     password: req.body.password,
//   });

//   if (user) {
//     const token = jwt.sign(
//       {
//         email: user.email,
//         name: user.name,
//       }, process.env.SECURE_TOKEN, { expiresIn: "7d" }
//     );

//     return res.json({ status: "ok", user: token });
//   } else {
//     return res.json({ status: "error", user: false });
//   }
// } catch (err) {
//   res.status(500).json(err);
// }