const router = require("express").Router()
const path = require("path")

const { verPelisCatalogo, verInformacionPelicula } = require("./controllers/peliculas.controller")

const { newUserValidation } = require("./validators/user.validation")
//const { newUserValidation } = require("./validators/user.validation")


router.get("/prueba" , (req, res) =>{
    res.send("<h1>get prueba</h1>")
})

router.post("/caso1", newUserValidation, verPelisCatalogo)

router.get("/caso2", verPelisCatalogo)



module.exports = {
    router
}