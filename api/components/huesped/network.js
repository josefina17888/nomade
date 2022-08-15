const express = require("express")
const response = require("../../network/response")
const router = express.Router();
const {addUser,getUser} = require("./controller")

router.get("/", async function(req,res) {
    let {name} = req.query || null
    try {
        const allUsers = await getUser(name)
        response.success(req, res, allUsers,200)
    }
    catch(error) {
        response.error(req, res, "Unexpected error" ,500 , error)
    }
   
})

router.post("/" , async function(req,res) {
    const {name , email} = req.body
    console.log(name)
    console.log(email)
    try{
    const newUser = await addUser(name , email)
    console.log(newUser)
    response.success(req, res, newUser , 201)
    }
    catch (error){
        response.error(req, res, error.message ,400 , "Verificar controller")
    }
})

module.exports = router;
