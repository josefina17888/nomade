const express = require("express");
const router = express.Router();
const {addGuest,upDate,getGuest,deleteMessage} = require("./controller")
const Model = require("../../models/Guest");
const upload = require("../../../libs/storage")
 

router.get("/", async(req,res) => {
    let {filterGuest} = req.query
    try {
        const guest = await getGuest(filterGuest)
        res.status(201).send(guest)
    }
    catch(error) {
        res.status(500).send(error)
    }
})


router.post("/", upload.single("picture") ,async (req, res) => {
  const {username, name , lastname , email , cellPhone , dni , country, birthDate ,password} = req.body
  const {filename} = req.file
  console.log(req.file)
  console.log(filename)
    
    try{
      const newGuest = await addGuest(username, name , lastname , email , cellPhone , dni , country, filename, birthDate,password)
      res.status(201).send(newGuest)
      }
      catch (error){
          res.status(404).send(error)
      }
  

});

router.patch("/:id", async (req, res) => {
    const{id} = req.params
    const {username, name , lastname , email , cellPhone , country,picture, birthDate} = req.body  
    try{

        const updateGuest = await upDate(id , req.body)
        res.status(201).send("Actualizado con éxito")
        }
        catch (error){
            res.status(404).send(error)
        }    
});

router.delete("/:id", async (req,res) => {
    const {id} = req.params
    try{
    await deleteMessage(id)
    res.status(200).send(`Usuario: ${id} eliminado `)
    }
    catch (error){
        res.status(404).send(error)
    }
})


module.exports = router
