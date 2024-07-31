import { comprarBoleta } from "./boletas.service.js"
import { cancelarReserva } from "./boletas.service.js"

export async function casoUso4(){
    let idFuncion = "66a95317e5d7725b81bbbbda"
    let idCliente = "66a8126cfd41ab3e685d4337"
    let asiento = "A4"
    let pago = false

    let res = await comprarBoleta(idFuncion, idCliente, asiento, pago)
    console.log(res)
}

export async function casoUso7(){
    let idBoleta = "66a9e8228642d4cb8456c690"

    let res = await cancelarReserva(idBoleta)
    console.log(res)
}