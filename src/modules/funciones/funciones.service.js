import { FuncionesRepository } from "./funciones.repository.js"

export async function verDisponibilidadAsientos(idFuncion){
    let funcionesCollection = new FuncionesRepository()

    //Obtener asientos ocupados y limites
    let funcion = await funcionesCollection.getFuncionById(idFuncion)
    if(!funcion) return { resultado: "error", mensaje: "Id de la funcion invalida" }

    let asientosData = await funcionesCollection.getAsientosFuncion(idFuncion)

    const alfabeto = "abcdefghijklmnopqrstuvwxyz"

    let asientosDisponibles = []
    for(let letra of alfabeto.toUpperCase()){
        if(letra <= asientosData.limitFila){
            let contador = 1
            while (contador <= parseInt(asientosData.limitCol)){
                let newLetra = `${letra}${contador}`
                if(!asientosData.asientosOcupados.includes(newLetra)){
                    asientosDisponibles.push(newLetra)
                }
                contador++
            }
        }
    }

    return {
        asientos_libres: asientosDisponibles,
        mensaje: "Array ordenado de asientos libres  para la funcion"
    }

    
}