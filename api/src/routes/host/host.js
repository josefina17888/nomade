const express = require("express");
const router = express.Router();
const {addHost} = require("./controller")
const upload = require("../../../libs/storage")
 


// const Host = require("../../models/Host");


// router.post("/", async (req, res) => {
//     const {name , lastname , email , cellPhone , dni ,country, birthDate, photo} = req.body
//     try {
//       const myHost = await new Host(req.body);
//       myHost.save()
//           res.status(200).json(myHost)
//       } catch (error) {
//           res.status(400).send('no se pudo guardar el Host')
//           console.log(error)
//       }
  
//   });


  router.post("/", upload.single("picture") ,async (req, res) => {
    const {name , lastname , email , cellPhone , dni ,country, birthDate} = req.body
    const {filename} = req.file
     
      try{
        const newHost = await addHost(name , lastname , email , cellPhone , dni ,country, filename , birthDate)
        res.status(201).send(newHost)
        }
        catch (error){
            res.status(404).send(error)
        }
    
  
  });
  
  
  module.exports = router;


