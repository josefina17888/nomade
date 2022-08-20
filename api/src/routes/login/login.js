const express = require("express");
const router = express.Router();
const Guest = require("../../models/Guest");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const user = await Guest.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
        }, process.env.SECURE_TOKEN,
      );

      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router