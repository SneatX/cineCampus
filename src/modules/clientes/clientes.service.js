import { ClientesRepository } from "./clientes.repository.js"
import { ObjectId } from "mongodb"

export async function nuevoUsuario(infoCliente){
    let {nombre, apellido, nick, email, telefono, id_tarjeta} = infoCliente
    let clientesCollection = new ClientesRepository()

    //Validar que no existan datos importantes repetidos
    let clientes = await clientesCollection.getAllClientes()
    for(let cliente of clientes){
        if(infoCliente.email === cliente.email) return { resultado: "error", mensaje: "Email ya registrado anteriormente" }

        if(infoCliente.nick === cliente.nick) return { resultado: "error", mensaje: "Nick ya registrado anteriormente" }

        if(infoCliente.id_tarjeta === cliente.id_tarjeta.toString()) return { resultado: "error", mensaje: "Tarjeta ya registrado anteriormente" }
    }
}