const { FuncionesRepository } = require('../model/funciones.model.js');
const { ClientesRepository } = require('../model/clientes.model.js');
const { BoletasRepository } = require('../model/boletas.model.js');
const { TarjetasRepository } = require('../model/tarjetas.model.js');
const { ObjectId } = require('mongodb');

/**
 * Compra una boleta para una función de cine.
 *
 * @param {string} idFuncion - El ID de la función.
 * @param {string} idCliente - El ID del cliente.
 * @param {string} asiento - El asiento deseado en formato "FilaColumna" (e.g., "A10").
 * @param {boolean} pago - Indica si la boleta ha sido pagada.
 * @returns {Object} - Retorna un objeto con el resultado de la operación.
 * @returns {string} resultado - El resultado de la operación ('exito' o 'error').
 * @returns {string} mensaje - Mensaje asociado con el resultado.
 */
async function comprarBoleta(idFuncion, idCliente, asiento, pago) {
    let funcionesCollection = new FuncionesRepository();
    let clientesCollection = new ClientesRepository();
    let boletaCollection = new BoletasRepository();
    let tarjetasCollection = new TarjetasRepository();

    //Validacion existencia de funcion y cliente
    let funcion = await funcionesCollection.getFuncionById(idFuncion);
    if (!funcion)
        return { resultado: 'error', mensaje: 'Id de funcion invalido' };

    let cliente = await clientesCollection.getClienteById(idCliente);
    if (!cliente)
        return { resultado: 'error', mensaje: 'Id de cliente invalido' };

    //Validacion semantica del asiento valida
    let infoSala = await funcionesCollection.getAsientosFuncion(idFuncion);

    let validacionAsiento = /^[A-Z](0?[1-9]|[1-9][0-9])$/;
    if (!validacionAsiento.test(asiento)) {
        return {
            resultado: 'error',
            mensaje: 'Formato de asiento ingresado de manera incorrecta'
        };
    }

    //Validacion del asiento dentro de los limites de la sala
    let filaDeseada = asiento[0];
    if (filaDeseada > infoSala.limitFila)
        return { resultado: 'error', mensaje: 'Limite de fila excedido' };

    let columnaDeseada = asiento.slice(1);
    if (+columnaDeseada > +infoSala.limitCol)
        return { resultado: 'error', mensaje: 'Limite de columna excedido' };

    //Validacion asiento no ocupado
    if (infoSala.asientosOcupados.includes(asiento))
        return { resultado: 'error', mensaje: 'Asiento ocupado' };

    //Validar que se ingreso con la cuenta del usuario
    if (cliente.nick != process.env.MONGO_USER)
        return {
            resultado: 'error',
            mensaje: 'No inicio sesion con la cuenta del usuario a comprar'
        };

    //Calcular valor boleta validando
    let precio = funcion.precio;

    //Revisar validez de tarjeta - Caso de uso 8 y 9
    let idTarjeta = cliente.id_tarjeta;
    if (idTarjeta) {
        let resTarjeta = await tarjetasCollection.getTarjetaById(idTarjeta);
        if (resTarjeta) {
            precio -= 2000;
        }
    }

    //Actualizacion de asientos ocupados y creacion de la boleta
    let resAsientos = await funcionesCollection.aggregateNewAsientoOcupado(
        idFuncion,
        asiento
    );

    let newBoleta = {
        id_funcion: new ObjectId(idFuncion),
        id_cliente: new ObjectId(idCliente),
        fila: filaDeseada,
        columna: columnaDeseada,
        valor: precio,
        pago: pago
    };
    let resBoleta = await boletaCollection.aggregatenewBoleta(newBoleta);
    return resBoleta;
}

/**
 * Cancela una reserva de boleta.
 *
 * @param {string} idBoleta - El ID de la boleta.
 * @returns {Object} - Retorna un objeto con el resultado de la operación.
 * @returns {string} resultado - El resultado de la operación ('exito' o 'error').
 * @returns {string} mensaje - Mensaje asociado con el resultado.
 */
async function cancelarReserva(idBoleta) {
    let boletasCollection = new BoletasRepository();
    let funcionesCollection = new FuncionesRepository();

    //Validar existencia boleta
    let boleta = await boletasCollection.getBoletaById(idBoleta);
    if (!boleta)
        return { resultado: 'error', mensaje: 'Id de la boleta invalida' };

    //validar que no sea paga la boleta
    if (boleta.pago)
        return {
            resultado: 'error',
            mensaje: 'Boleta paga, no puede ser cancelada'
        };

    //Eliminar boleta
    let boletaEliminada = await boletasCollection.deleteBoletaById(idBoleta);

    //Eliminar asiento ocupado de la funcion
    let asiento = `${boleta.fila}${boleta.columna}`;
    let asientoEliminado = await funcionesCollection.deleteAsiento(
        boleta.id_funcion.toString(),
        asiento
    );
    return {
        boleta_eliminada: idBoleta,
        asiento: asiento,
        funcion: boleta.id_funcion.toString()
    };
}

module.exports = {
    comprarBoleta,
    cancelarReserva
};
