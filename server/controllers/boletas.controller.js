const { FuncionesRepository } = require('../model/funciones.model.js');
const { ClientesRepository } = require('../model/clientes.model.js');
const { BoletasRepository } = require('../model/boletas.model.js');
const { TarjetasRepository } = require('../model/tarjetas.model.js');

const { validationResult } = require('express-validator');
const { BoletasDto } = require('../dto/boletas.dto.js')
const { FuncionesDto } = require('../dto/funciones.dto.js')
const { ClientesDto } = require('../dto/clientes.dto.js');
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
async function comprarBoleta(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    let {idFuncion, idCliente, asiento, pago} = req.body

    let funcionesCollection = new FuncionesRepository();
    let clientesCollection = new ClientesRepository();
    let boletaCollection = new BoletasRepository();
    let tarjetasCollection = new TarjetasRepository();

    let boletasDto = new BoletasDto()
    let funcionesDto = new FuncionesDto()
    let clientesDto = new ClientesDto()

    //Validacion existencia de funcion y cliente
    let funcion = await funcionesCollection.getFuncionById(idFuncion);
    let dtoRes = !funcion ? funcionesDto.nonExistentFunction(idFuncion) : funcionesDto.okTemplate()
    if(dtoRes.status === 404) return res.status(dtoRes.status).json(dtoRes); 

    let cliente = await clientesCollection.getClienteById(idCliente);
    dtoRes = !cliente ? clientesDto.nonExistentClient(idCliente) : clientesDto.okTemplate()
    if(dtoRes.status === 404) return res.status(dtoRes.status).json(dtoRes); 

    //Validacion semantica del asiento valida
    let infoSala = await funcionesCollection.getAsientosFuncion(idFuncion);

    // let validacionAsiento = /^[A-Z](0?[1-9]|[1-9][0-9])$/;
    // if (!validacionAsiento.test(asiento)) {
    //     return {
    //         resultado: 'error',
    //         mensaje: 'Formato de asiento ingresado de manera incorrecta'
    //     };
    // }

    //Validacion del asiento dentro de los limites de la sala
    let filaDeseada = asiento[0];
    if (filaDeseada > infoSala.limitFila) dtoRes = boletasDto.nonExistentRow(asiento)

    let columnaDeseada = asiento.slice(1);
    if (+columnaDeseada > +infoSala.limitCol) dtoRes = boletasDto.nonExistentColumn(asiento)

    //Validacion asiento no ocupado
    if (infoSala.asientosOcupados.includes(asiento)) dtoRes = boletasDto.occupiedSeat(asiento)

    if(dtoRes.status === 400) return res.status(dtoRes.status).json(dtoRes); 

    // //Validar que se ingreso con la cuenta del usuario
    // if (cliente.nick != process.env.MONGO_USER)
    //     return {
    //         resultado: 'error',
    //         mensaje: 'No inicio sesion con la cuenta del usuario a comprar'
    //     };

    //Calcular valor boleta validando
    let precio = funcion.precio;

    //Revisar validez de tarjeta - Caso de uso 8 y 9
    let idTarjeta = cliente.id_tarjeta;
    if (idTarjeta) {
        let resTarjeta = await tarjetasCollection.getTarjetaById(idTarjeta);
        if (resTarjeta) {
            precio -= 2500;
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
    if(resBoleta || resAsientos) dtoRes = boletasDto.createdTemplate(newBoleta)
        
    return res.status(dtoRes.status).json(dtoRes); 
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
