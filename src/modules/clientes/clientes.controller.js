import { nuevoUsuario } from "./clientes.service.js";

export async function casoUso1(){
    let nuevoCliente = {
        nombre: "Santiago",
        apellido: "Ospina",
        nick: "SneatX",
        email: "123@gmail.com",
        telefono: "3123456634",
        id_tarjeta: "60d5ec49f1f8e4f1f0d5e8c1"
    }
    let res = await nuevoUsuario(nuevoCliente)   
    console.log(res)
}