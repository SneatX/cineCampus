import { FuncionesRepository } from "../funciones/funciones.repository.js";
import { ClientesRepository } from "../clientes/clientes.repository.js";

export async function comprarBoleta(idFuncion, idCliente, asiento){
    let funcionesCollection = new FuncionesRepository()
    let clientesCollection = new ClientesRepository()

    let funcion = funcionesCollection.getFuncionById(idFuncion)
    if(!funcion) return { resultado: "error", mensaje: "Id de funcion inexistente" }

    let clientes = clientesCollection.
}