const express = require("express")
const router = require("../guest/guest")
const PaymentController = require("./PaymentController")
const PaymentService = require("./PaymentService")
const paymentInstance = new PaymentController(new PaymentService ())

router.post("/payment", function (req, res, next) {
    paymentInstance.createPayment(req, res)
})

module.exports = router;