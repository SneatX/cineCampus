const { cambiarRol, nuevoUsuario } = require('./clientes.controller.js');
const { getDetallesUsuario } = require('./clientes.controller.js');
const { getAllUsuarios } = require('./clientes.controller.js');

async function casoUso1() {
    let nuevoCliente = {
        nombre: '',
        apellido: '',
        nick: '',
        email: '',
        telefono: '',
        id_tarjeta: '',
        admin: false
    };
    let res = await nuevoUsuario(nuevoCliente);
    console.log(res);
}

async function casoUso10() {
    let nick = 'admin';

    let res = await getDetallesUsuario(nick);
    console.log(res);
}

async function casoUso11(){
    let nick = "sneatx"
    let rol = "vip"

    let res = await cambiarRol(nick, rol)
    console.log(res)
}

async function casoUso12() {
    let res = await getAllUsuarios();
    console.log(res);
}

module.exports = {
    casoUso1,
    casoUso10,
    casoUso11,
    casoUso12
}

