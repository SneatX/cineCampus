import { FuncionesRepository } from "./funciones.repository.js"

export async function verDisponibilidadAsientos(idFuncion){
    let funcionesCollection = new FuncionesRepository()

    //Obtener asientos ocupados y limites
    let funcion = await funcionesCollection.getFuncionById(idFuncion)
    if(funcion) return { resultado: "error", mensaje: "Tarjeta ya registrado anteriormente" }
    let limite = await funcionesCollection.getAsientosFuncion(idFuncion)
}