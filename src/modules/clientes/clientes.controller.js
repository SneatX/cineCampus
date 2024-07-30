import { nuevoUsuario } from "./clientes.service.js";

export async function casoUso1(){
    let nuevoCliente = {
        nombre: "Santiago",
        apellido: "Ospina",
        nick: "SneatX",
        email: "123@gmail.com",
        telefono: "3123456634",
        id_tarjeta: "sd"
    }
    let res = await nuevoUsuario(nuevoCliente)   
    console.log(res)
}