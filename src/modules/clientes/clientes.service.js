import { ClientesRepository } from './clientes.repository.js';
import { ObjectId } from 'mongodb';

/**
 * Crea un nuevo usuario en la base de datos.
 * 
 * @param {Object} infoCliente - Información del cliente.
 * @param {string} infoCliente.nombre - Nombre del cliente.
 * @param {string} infoCliente.apellido - Apellido del cliente.
 * @param {string} infoCliente.nick - Nickname del cliente.
 * @param {string} infoCliente.email - Correo electrónico del cliente.
 * @param {string} infoCliente.telefono - Teléfono del cliente.
 * @param {string} infoCliente.id_tarjeta - ID de la tarjeta del cliente (puede ser null).
 * @returns {Object} - Retorna un objeto con el resultado de la operación.
 * @returns {string} resultado - El resultado de la operación ('exito' o 'error').
 * @returns {string} mensaje - Mensaje asociado con el resultado (por ejemplo, 'Email ya registrado anteriormente').
 */

export async function nuevoUsuario(infoCliente) {
    let { nombre, apellido, nick, email, telefono, id_tarjeta } = infoCliente;
    let clientesCollection = new ClientesRepository();

    //Validar que no existan datos importantes repetidos
    let clientes = await clientesCollection.getAllClientes();
    for (let cliente of clientes) {
        if (infoCliente.email === cliente.email)
            return {
                resultado: 'error',
                mensaje: 'Email ya registrado anteriormente'
            };

        if (infoCliente.nick === cliente.nick)
            return {
                resultado: 'error',
                mensaje: 'Nick ya registrado anteriormente'
            };

            

        if(cliente.id_tarjeta != null){

            if (infoCliente.id_tarjeta === cliente.id_tarjeta.toString())
            return {
                resultado: 'error',
                mensaje: 'Tarjeta ya registrado anteriormente'
            };
        }

    }

    if (ObjectId.isValid(id_tarjeta)) {
        console.log('con tarjeta');
        let newUserRes = await clientesCollection.createNewUser(
            nick,
            '1234',
            'vip'
        );
    } else {
        console.log('sin tarjeta');
        let newUserRes = await clientesCollection.createNewUser(
            nick,
            '1234',
            'estandar'
        );
        id_tarjeta = null;
    }

    let newClient = {
        id_tarjeta: id_tarjeta,
        nombre: nombre,
        apellido: apellido,
        nick: nick,
        email: email,
        telefono
    };

    let resClient = await clientesCollection.agreggateNewClient(newClient);
    return resClient;
}


/**
 * Obtiene los detalles de un usuario específico.
 * 
 * @param {string} nickDeseado - Nickname del usuario deseado.
 * @returns {Object} - Retorna un objeto con los detalles del cliente y usuario.
 */
export async function getDetallesUsuario(nickDeseado) {
    let clientesCollection = new ClientesRepository();

    let cliente = await clientesCollection.getClienteByNick(nickDeseado);
    let usuario = await clientesCollection.getUsuarioByNick(nickDeseado);

    return {
        ...cliente,
        ...usuario
    };
}


/**
 * Obtiene una lista de todos los usuarios.
 * 
 * @returns {Array} - Retorna un array con todos los usuarios.
 */
export async function getAllUsuarios() {
    let clientesCollection = new ClientesRepository();
    let res = await clientesCollection.getAllUsuarios();
    return res;
}
