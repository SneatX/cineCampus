import { verPelisCatalogo } from "./peliculas.service.js";

export async function casoUso2(){
    let res = await verPelisCatalogo()
    console.log(res)
}