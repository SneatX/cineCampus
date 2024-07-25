import { FuncionesRepository } from './funciones.repository.js';


/**
 * Obtiene la disponibilidad de asientos para una función de cine.
 * 
 * @param {string} idFuncion - El ID de la función.
 * @returns {Object} - Retorna un objeto con los asientos disponibles y un mensaje.
 * @returns {Array} retorno.asientos_libres - Array con los asientos libres para la función.
 * @returns {string} retorno.mensaje - Mensaje descriptivo sobre el estado de la operación.
 */
export async function verDisponibilidadAsientos(idFuncion) {
    let funcionesCollection = new FuncionesRepository();

    //Obtener asientos ocupados y limites
    let funcion = await funcionesCollection.getFuncionById(idFuncion);
    if (!funcion)
        return { resultado: 'error', mensaje: 'Id de la funcion invalida' };

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

    return {
        asientos_libres: asientosDisponibles,
        mensaje: 'Array ordenado de asientos libres  para la funcion'
    };
}
