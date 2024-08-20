const router = require('express').Router();
const path = require('path');

const {
    verPelisCatalogo,
    verInformacionPelicula
} = require('./controllers/peliculas.controller');
const { nuevoUsuario } = require('./controllers/clientes.controller');

const { newUserValidation } = require('./validators/user.validation');
const { getMovieDataValidation } = require('./validators/peliculas.validation');

router.get('/prueba', (req, res) => {
    res.send('<h1>get prueba</h1>');
});

router.post('/caso1', newUserValidation(), nuevoUsuario);

router.get('/caso2', verPelisCatalogo);

router.get('/caso3', getMovieDataValidation(), verInformacionPelicula);

module.exports = {
    router
};
