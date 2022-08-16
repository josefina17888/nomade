const Model = require('./model')

const postAnfitrion = async (req, res) => {
    // try {
    //     let newAnfitrion = new Anfitrion(req.body)
    //     await newAnfitrion.save()
    //     res.status(200).json(newAnfitrion)

    // } catch (error) {
    //     res.status(400).send('no se pudo guardar el anfitrion')
    //     console.log(error)
    // }
    
}

 async function getAnfitriones (res,req) {
   const {name}=req.query
    try {
    if(name) {
      const anf = await Model.find(name)
        res.status(200).json(anf)
    }
    const all = await Model.find()
    res.status(200).json(all)
   } catch (error) {
    console.log(error)
   }
    
}

module.export = { postAnfitrion, getAnfitriones, getAnfitrionByDni }