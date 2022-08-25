const router = require("express").Router();
const Lodging = require("../../models/Lodging");
const Host = require("../../models/Host");
const Favorite = require("../../models/Favorite");
const mongoose = require("mongoose");
const upload = require("../../../libs/storage")
const Guest = require("../../models/Guest")
const toId = mongoose.Types.ObjectId;

  ///POSTEA FAVORITOS//

  router.post("/", async (req, res) => {
    console.log("soy post")
    const infoGuest= await Guest.find({email: req.body.userEmail})


    let userId = ( infoGuest[0]._id)
      try{
        const newFav= await Favorite.create(req.body)
        newFav.lodgingId = toId(req.body.lodgingId)  
        newFav.guestId =(userId)
        newFav.save() 
        res.json(newFav)
      }catch(err){
          res.status(400).send("No se pudo crear");
        console.log(err);
      }
    
  }) 
//TRAE TODOS LOS FAVORITOS DE UN LODGING 
/*   router.post("/allFavs", async (req, res) => { 
    let lodging= req.body.lodgingId
    const favs = await Favorite.find({lodgingId:lodging})
    
   /*  let favNumb= favs.length */
   // res.send(favs) 
  // }) 

    //TRAE LOS FAVORITOS DE UN USUARIO
    router.post("/fav", async (req, res) => { 
      try{
      const infoGuest= await Guest.find({email: req.body.userEmail})
      let userId = ( infoGuest[0]._id)
      let favs = await Favorite.find({ guestId: userId}).populate({path:"lodgingId", model:"Lodging"})
            res.send(favs);
      }catch(err){
        res.send(err)
      }
      
    }) 



  router.post("/favoriteNumber", async (req, res) => {
    console.log("soy delete")
    try{
      const fav= await Favorite.find({"lodgindId": req.body.lodgindId})
      const favNumber= fav.length
      res.json(favNumber)
    
    }catch(err){
        res.send(err)
    }
  })


  router.post("/delete", async (req, res) => {
    console.log("you")
    
   
    try{
      const infoGuest= await Guest.find({email: req.body.userEmail})
    console.log("infoGuest", infoGuest)
      let userId = ( infoGuest[0]._id)
      console.log("userId", userId)
      let lodgingI= toId(req.body.lodgingId) 
      console.log("LI",lodgingI)
      allFavs= Favorite.find({})
      console.log("all",allFavs)
      let user= await allFavs.find({guestId: userId})
      console.log("user", user)
      let deleted= await user.deleteOne({lodgingId: lodgingI})
      await user.remove()
      console.log("aqui elimino")
      console.log("deleted", deleted)
      
   
          res.send({data:true});
      
    }catch(err){
     res.json(err)
    }
  })
  
  
  

  module.exports = router
  