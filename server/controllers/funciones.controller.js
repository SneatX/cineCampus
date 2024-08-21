const { FuncionesRepository } = require('../model/funciones.model.js');
const { validationResult } = require('express-validator');
const { FuncionesDto } = require('../dto/funciones.dto.js')

/**
 * Obtiene la disponibilidad de asientos para una función de cine.
 *
 * @param {string} idFuncion - El ID de la función.
 * @returns {Object} - Retorna un objeto con los asientos disponibles y un mensaje.
 * @returns {Array} retorno.asientos_libres - Array con los asientos libres para la función.
 * @returns {string} retorno.mensaje - Mensaje descriptivo sobre el estado de la operación.
 */
async function verDisponibilidadAsientos(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    let funcionesCollection = new FuncionesRepository();
    let funcionesDto = new FuncionesDto()
    let idFuncion = req.query.id

    //Obtener asientos ocupados y limites
    let funcion = await funcionesCollection.getFuncionById(idFuncion);
    
    let resDto = !funcion ? funcionesDto.nonExistentFunction(idFuncion) : funcionesDto.okTemplate()

    if(resDto.status === 404) return res.status(resDto.status).json(resDto);

    let asientosData = await funcionesCollection.getAsientosFuncion(idFuncion);

    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    let asientosDisponibles = [];
    for (let letra of alfabeto.toUpperCase()) {
        if (letra <= asientosData.limitFila) {
            let contador = 1;
            while (contador <= parseInt(asientosData.limitCol)) {
                let newLetra = `${letra}${contador}`;
                if (!asientosData.asientosOcupados.includes(newLetra)) {
                    asientosDisponibles.push(newLetra);
                }
                contador++;
            }
        }
    }
    resDto = funcionesDto.okTemplate(asientosDisponibles)
    return res.status(resDto.status).json(resDto);
}

module.exports = {
    verDisponibilidadAsientos
};
