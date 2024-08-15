const router = require("express").Router()
const path = require("path")

const { verPelisCatalogo, verInformacionPelicula } = require("./controllers/peliculas.controller")
//const { newUserValidation } = require("./validators/user.validation")


router.get("/prueba" , (req, res) =>{
    res.send("<h1>get prueba</h1>")
})

router.get("/caso2", verPelisCatalogo)

//router.post("/users" , newUserValidation, postNewUser)


module.exports = {
    router
}