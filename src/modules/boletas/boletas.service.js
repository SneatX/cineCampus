import { FuncionesRepository } from "../funciones/funciones.repository.js";
import { ClientesRepository } from "../clientes/clientes.repository.js";
import { BoletasRepository } from "./boletas.repository.js";
import { TarjetasRepository } from "../tarjetas/tarjetas.repository.js";
import { ObjectId } from "mongodb";

export async function comprarBoleta(idFuncion, idCliente, asiento, pago){
    let funcionesCollection = new FuncionesRepository()
    let clientesCollection = new ClientesRepository()
    let boletaCollection = new BoletasRepository()
    let tarjetasCollection = new TarjetasRepository()

    //Validacion existencia de funcion y cliente
    let funcion = await funcionesCollection.getFuncionById(idFuncion)
    if(!funcion) return { resultado: "error", mensaje: "Id de funcion invalido" }

    let cliente = await clientesCollection.getClienteById(idCliente)
    if(!cliente) return { resultado: "error", mensaje: "Id de cliente invalido" }

    //Validacion semantica del asiento valida
    let infoSala = await funcionesCollection.getAsientosFuncion(idFuncion)

    let validacionAsiento = /^[A-Z](0?[1-9]|[1-9][0-9])$/
    if(!validacionAsiento.test(asiento)){
        return { resultado: "error", mensaje: "Formato de asiento ingresado de manera incorrecta" }
    }

    //Validacion del asiento dentro de los limites de la sala
    let filaDeseada = asiento[0]
    if(filaDeseada > infoSala.limitFila) return { resultado: "error", mensaje: "Limite de fila excedido" }
    
    let columnaDeseada = asiento.slice(1)
    if(+columnaDeseada > +infoSala.limitCol) return { resultado: "error", mensaje: "Limite de columna excedido" }

    //Validacion asiento no ocupado
    if(infoSala.asientosOcupados.includes(asiento)) return { resultado: "error", mensaje: "Asiento ocupado" }

    //Validar que se ingreso con la cuenta del usuario
    //if(!cliente.nick != process.env.MONGO_USER) return { resultado: "error", mensaje: "No inicio sesion con la cuenta del usuario a comprar" }

    //Calcular valor boleta validando
    let precio = funcion.precio

    //Revisar validez de tarjeta - Caso de uso 8 y 9
    let idTarjeta = cliente.id_tarjeta
    if(idTarjeta){
        let resTarjeta = await tarjetasCollection.getTarjetaById(idTarjeta)
        if(resTarjeta){
            precio -= 2000
        }
    }   

    console.log(precio)

    //Actualizacion de asientos ocupados y creacion de la boleta
    //let resAsientos = await funcionesCollection.aggregateNewAsientoOcupado(idFuncion, asiento)
    /*
    let newBoleta = {
        id_funcion: new ObjectId(idFuncion),
        id_cliente: new ObjectId(idCliente),
        fila: filaDeseada,
        columna: columnaDeseada,
    }
    let resBoleta = await boletaCollection.aggregatenewBoleta(newBoleta)
    */
}