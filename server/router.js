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


const stripe = require('stripe')("sk_test_51Pu4z6ENv6lYUGDbzYvJhvhvFCExEJcPOeSlH7VC4z6phnvZhnP9XBUSM0c4Yf91wugqPP2Z5dCOTCkkCD4k86rZ00x1wwlVUP");


router.get("/getClientsData", getClientByNickValidation(), getClientByNick)

router.get('/getFunctionsByMovie', funcionesByMovie)


router.post('/caso1', newUserValidation(), nuevoUsuario);

router.get('/caso2', verPelisCatalogo);

router.get('/caso3', getMovieDataValidation(), verInformacionPelicula);

router.post('/caso4', buyTicketValidation(), comprarBoleta);

router.get('/caso5', getSeatsValidation(), verDisponibilidadAsientos);

router.post("/create-payment-intent", async (req, res) => {

    const { id, amount, movie } = req.body

    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never"
            },
            payment_method: id,
            confirm: true,
    
        })
        res.send({
            ...payment
        });
    } catch (err) {
        res.send({
            ...err
        });
    }    

})


module.exports = {
    router
};
