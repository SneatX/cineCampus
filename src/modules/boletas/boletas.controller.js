import { comprarBoleta } from './boletas.service.js';
import { cancelarReserva } from './boletas.service.js';

export async function casoUso4() {
    let idFuncion = '66a95317e5d7725b81bbbbda';
    let idCliente = '66ac9e77440bea4a371bd6c3';
    let asiento = 'A1';
    let pago = false;

    let res = await comprarBoleta(idFuncion, idCliente, asiento, pago);
    console.log(res);
}

export async function casoUso7() {
    let idBoleta = '66aca3bdc0db60fc35e8f490';

    let res = await cancelarReserva(idBoleta);
    console.log(res);
}
