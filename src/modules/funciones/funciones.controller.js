import { verDisponibilidadAsientos } from "./funciones.service.js";

export async function casoUso5(){
    let idFuncion = "66a95317e5d7725b81bbbbda"

    let res = await verDisponibilidadAsientos(idFuncion)
    console.log(res)
}