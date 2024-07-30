import { comprarBoleta } from "./boletas.service.js"

export async function casoUso4(){
    let idFuncion = "66a95317e5d7725b81bbbbda"
    let idCliente = "66a8126cfd41ab3e685d4337"
    let asiento = "A4"

    let res = await comprarBoleta(idFuncion, idCliente, asiento)
    console.log(res)
}