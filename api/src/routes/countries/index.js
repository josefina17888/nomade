const router = require("express").Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const countryApi = await axios.get("https://restcountries.com/v3.1/all");
    const getCountry = countryApi.data
      .map((e) => {
        return {
          name: e.name.common,
        };
      })
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    res.json(getCountry);
  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = router;
