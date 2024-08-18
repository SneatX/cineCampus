const { ClientesRepository } = require('../model/clientes.model.js');
const { ClientesDto } = require("../dto/clientes.dto.js")
const { validationResult } = require("express-validator")
const { ObjectId } = require('mongodb');

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

async function nuevoUsuario(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    let { nombre, apellido, nick, email, telefono, id_tarjeta, admin } = req.body

    let clientesDto = new ClientesDto()
    let clientesCollection = new ClientesRepository();
    let dtoRes

    if(admin){
        //Validar la no existencia de un usuario con el mismo nick
        let nickExistence = await clientesCollection.getUserByNick(nick)
        dtoRes = nickExistence ? clientesDto.repeatedAdminNick() : clientesDto.okTemplate()

        if(dtoRes.status === 400) return res.status(dtoRes.status).json(dtoRes)

        let newAdmin = await clientesCollection.createNewUser(
            nick, //usuario
            '1878', //contraseña
            'admin', //rol
            "admin" //base de datos
        );

        dtoRes = newAdmin.ok ? clientesDto.newAdminTemplate(newAdmin) : clientesDto.errCreatingAdmin()
        if(dtoRes.status === 404) res.status(dtoRes.status).json(dtoRes)
        res.status(dtoRes.status).json(dtoRes)
    }

    

    // //Validar que no existan datos importantes repetidos
    // let clientes = await clientesCollection.getAllClientes();
    // for (let cliente of clientes) {
    //     if (infoCliente.email === cliente.email)
    //         return {
    //             resultado: 'error',
    //             mensaje: 'Email ya registrado anteriormente'
    //         };

    //     if (infoCliente.nick === cliente.nick)
    //         return {
    //             resultado: 'error',
    //             mensaje: 'Nick ya registrado anteriormente'
    //         };

            

    //     if(cliente.id_tarjeta != null){

    //         if (infoCliente.id_tarjeta === cliente.id_tarjeta.toString())
    //         return {
    //             resultado: 'error',
    //             mensaje: 'Tarjeta ya registrado anteriormente'
    //         };
    //     }

    // }

    // if (ObjectId.isValid(id_tarjeta)) {
    //     console.log('con tarjeta');
    //     let newUserRes = await clientesCollection.createNewUser(
    //         nick,
    //         '1234',
    //         'vip',
    //         "cineCampus"
    //     );
    // } else {
    //     console.log('sin tarjeta');
    //     let newUserRes = await clientesCollection.createNewUser(
    //         nick,
    //         '1234',
    //         'estandar',
    //         "cineCampus"
    //     );
    //     id_tarjeta = null;
    // }

    // let newClient = {
    //     id_tarjeta: new ObjectId(id_tarjeta),
    //     nombre: nombre,
    //     apellido: apellido,
    //     nick: nick,
    //     email: email,
    //     telefono
    // };

    // let resClient = await clientesCollection.agreggateNewClient(newClient);
    // return resClient;
}


/**
 * Obtiene los detalles de un usuario específico.
 * 
 * @param {string} nickDeseado - Nickname del usuario deseado.
 * @returns {Object} - Retorna un objeto con los detalles del cliente y usuario.
 */
async function getDetallesUsuario(nickDeseado) {
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
async function getAllUsuarios() {
    let clientesCollection = new ClientesRepository();
    let res = await clientesCollection.getAllUsuarios();
    return res;
}

async function cambiarRol(nick, nuevoRol){
    let clientesCollection = new ClientesRepository()

    let res = await clientesCollection.changeRole(nick, nuevoRol)
    return res
}

module.exports = {
    nuevoUsuario,
    getDetallesUsuario,
    getAllUsuarios,
    cambiarRol
}
