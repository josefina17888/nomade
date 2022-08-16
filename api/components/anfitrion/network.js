const express = require("express")
const router = express.Router();
const {postAnfitrion, getAnfitriones } = require("./controller")


router.post('/anfitrion', postAnfitrion)
router.get('/anfitrion', getAnfitriones)

module.exports = router;
