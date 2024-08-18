const router = require("express").Router()
const path = require("path")

const { verPelisCatalogo } = require("./controllers/peliculas.controller")
const { nuevoUsuario } = require("./controllers/clientes.controller")

const { newUserValidation } = require("./validators/user.validation")
//const { newUserValidation } = require("./validators/user.validation")


router.get("/prueba" , (req, res) =>{
    res.send("<h1>get prueba</h1>")
})

router.post("/caso1", newUserValidation(), nuevoUsuario)

router.get("/caso2", verPelisCatalogo)



module.exports = {
    router
}