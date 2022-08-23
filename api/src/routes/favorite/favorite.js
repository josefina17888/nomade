const router = require("express").Router();
const Lodging = require("../../models/Lodging");
const Host = require("../../models/Host");
const Favorite = require("../../models/Favorite");
const mongoose = require("mongoose");
const upload = require("../../../libs/storage")
const toId = mongoose.Types.ObjectId;

  

  router.post("/:guestId", async (req, res) => {
     let guestId = req.params.guestId
    /* if(!guestId){
      res.redirect("http://localhost:3000/login")
    }else{ 
 */
      try{
        const newFav= await Favorite.create(req.body)
        newFav.lodgingId = toId(req.body.lodgingId)  
         newFav.guestId  = toId(guestId) 
         newFav.save() 
        res.json(newFav)
      }catch(err){
          res.status(400).send("No se pudo crear");
        console.log(error);
      }
    
  }) 
//TRAE TODOS LOS FAVORITOS DE UN LODGING
  router.get("/", async (req, res) => { 
    const favs = await Favorite.find().populate({path:"lodgingId", model: "Lodging"})
   /*  let favNumb= favs.length */
    res.send(favs) 
   })

  
  router.post("/favoriteNumber/:guestId",upload.array("picture"), async (req, res) => {
    try{
      const fav= await Favorite.find({"lodgindId": req.body.lodgindId})
      const favNumber= fav.length
      res.json(favNumber)
    
    }catch(err){
        res.send(err)
    }
  }) 
  router.get("/all", async (req, res) => {

    const lodging = await Lodging.find().populate({path:"hostId", model: "Host"});
    res.json(lodging)
   })

  module.exports = router
  