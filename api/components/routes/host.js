const router = require("express").Router();
const axios = require("axios");

router.post("/", async (req, res) => {
    const newHost = new Host(req.body);
    try {
      const savedHost = await newHost.save();
      res.status(200).json(savedHost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
 module.exports = router;