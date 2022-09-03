const express = require("express");
const router = express.Router();
const upload = require('../../../libs/storage.js');
const Lodging = require("../../models/Lodging");
const complaint = require("../../models/complaint");
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

        router.get("/getcomplaint", async (req, res) => {
            complaint.find({}, (error,docs)=>{
            res.send(docs)
        })
        })
        router.patch("/complaintfalse/:complaintId",upload.single(), async (req, res) => {

            complaint.findByIdAndUpdate(req.params.complaintId, { Visibility: false },
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
            router.get("/", async (req, res) => {
                const userSearching = await req.query.email;
                allGuest = await Guest.find();
                try {
                  if (userSearching) {
                    Guest.find({email : userSearching }, (err, usuario) => {
                      res.send(usuario);
                    });
                  } else {
                    res.json(allGuest);
                  }
                } catch (err) {
                  res.json(err);
                }
              });

module.exports = router;