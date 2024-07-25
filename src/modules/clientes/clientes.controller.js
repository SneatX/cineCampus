import { cambiarRol, nuevoUsuario } from './clientes.service.js';
import { getDetallesUsuario } from './clientes.service.js';
import { getAllUsuarios } from './clientes.service.js';

export async function casoUso1() {
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

export async function casoUso10() {
    let nick = 'sneatx';

    let res = await getDetallesUsuario(nick);
    console.log(res);
}

export async function casoUso11(){
    let nick = "sneatx"
    let rol = "vip"

    let res = await cambiarRol(nick, rol)
    console.log(res)
}

export async function casoUso12() {
    let res = await getAllUsuarios();
    console.log(res);
}

