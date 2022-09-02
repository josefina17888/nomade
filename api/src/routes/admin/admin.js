const express = require("express");
const router = express.Router();
const upload = require('../../../libs/storage.js');
const Lodging = require("../../models/Lodging");
const mongoose = require ("mongoose")
const Guest = require("../../models/Guest");
router.patch("/:LodgingId",upload.single(), async (req, res) => {

Lodging.findByIdAndUpdate(req.params.LodgingId, { Visibility: false },
                            function (err, docs) {
    if (err){
        console.log(err)
        res.status(400).send("no se pudo actualizar el lodging");
    }
    else{
        console.log("Updated User : ", docs);
        res.send("actualizado con exito")
    }
});
})
router.patch("/guestadmin/:guestId",upload.single(), async (req, res) => {

    Guest.findByIdAndUpdate(req.params.guestId, { isAdmin: true },
                                function (err, docs) {
        if (err){
            console.log(err)
            res.status(400).send("no se pudo actualizar el usuario");
        }
        else{
            console.log("Updated User : ", docs);
            res.send("actualizado con exito")
        }
    });
    })

    router.patch("/guestvisibility/:guestId",upload.single(), async (req, res) => {

        Guest.findByIdAndUpdate(req.params.guestId, { Visibility: false },
                                    function (err, docs) {
            if (err){
                console.log(err)
                res.status(400).send("no se pudo actualizar el usuario");
            }
            else{
                console.log("Updated User : ", docs);
                res.send("actualizado con exito")
            }
        });
       
        })

        router.patch("/guestadminfalse/:guestId",upload.single(), async (req, res) => {

            Guest.findByIdAndUpdate(req.params.guestId, { isAdmin: false },
                                        function (err, docs) {
                if (err){
                    console.log(err)
                    res.status(400).send("no se pudo actualizar el usuario");
                }
                else{
                    console.log("Updated User : ", docs);
                    res.send("actualizado con exito")
                }
            });
            })

module.exports = router;