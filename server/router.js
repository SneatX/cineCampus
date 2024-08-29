const router = require('express').Router();
const path = require('path');

const { verPelisCatalogo, verInformacionPelicula, funcionesByMovie } = require('./controllers/peliculas.controller');
const { nuevoUsuario, getClientByNick } = require('./controllers/clientes.controller');
const { comprarBoleta } = require('./controllers/boletas.controller')
const { verDisponibilidadAsientos } = require('./controllers/funciones.controller')

const { newUserValidation, getClientByNickValidation } = require('./validators/user.validation');
const { getMovieDataValidation } = require('./validators/peliculas.validation');
const { buyTicketValidation } = require('./validators/boletas.validation')
const { getSeatsValidation } = require('./validators/funciones.validation')

router.get('/prueba', (req, res) => {
    res.send('<h1>get prueba</h1>');
});

router.get("/getClientsData", getClientByNickValidation(), getClientByNick)

router.get('/getFunctionsByMovie', funcionesByMovie)


router.post('/caso1', newUserValidation(), nuevoUsuario);

router.get('/caso2', verPelisCatalogo);

router.get('/caso3', getMovieDataValidation(), verInformacionPelicula);

router.post('/caso4', buyTicketValidation(), comprarBoleta);

router.get('/caso5', getSeatsValidation(), verDisponibilidadAsientos);

module.exports = {
    router
};
