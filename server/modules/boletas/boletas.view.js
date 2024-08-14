const { comprarBoleta } = require('./boletas.controller.js');
const { cancelarReserva } = require('./boletas.controller.js');

async function casoUso4() {
    let idFuncion = '66a95317e5d7725b81bbbbda';
    let idCliente = '66ac9e77440bea4a371bd6c3';
    let asiento = 'A1';
    let pago = false;

    let res = await comprarBoleta(idFuncion, idCliente, asiento, pago);
    console.log(res);
}

async function casoUso7() {
    let idBoleta = '66aca3bdc0db60fc35e8f490';

    let res = await cancelarReserva(idBoleta);
    console.log(res);
}

module.exports = {
    casoUso4,
    casoUso7
}
