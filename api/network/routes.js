const express = require("express");
const huesped = require("../components/huesped/network");
// const anfitrion = require("../components/Anfitrion/network");

const routes = function (server) {
    server.use("/huesped" , huesped)
    // server.use("/anfitrion" , anfitrion)
}

module.exports = routes