import { nuevoUsuario } from './clientes.service.js';
import { getDetallesUsuario } from './clientes.service.js';
import { getAllUsuarios } from './clientes.service.js';

export async function casoUso1() {
    let nuevoCliente = {
        nombre: 'Santiago',
        apellido: 'Ospina',
        nick: 'SneatX',
        email: '123@gmail.com',
        telefono: '3123456634',
        id_tarjeta: 'sd'
    };
    let res = await nuevoUsuario(nuevoCliente);
    console.log(res);
}

export async function casoUso10() {
    let nick = 'SneatX';

    let res = await getDetallesUsuario(nick);
    console.log(res);
}

export async function casoUso11() {
    let res = await getAllUsuarios();
    console.log(res);
}
