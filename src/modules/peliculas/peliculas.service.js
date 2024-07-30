import { FuncionesRepository } from "../funciones/funciones.repository.js";
import { PeliculasRepository } from "./peliculas.repository.js";

export async function verPelisCatalogo(){
    let peliculasCollection = new PeliculasRepository()
    let funcionesCollection = new FuncionesRepository()
    
    let funciones = await funcionesCollection.getAllFunciones()
    let idsPelis = new Set()

    console.log(funciones)


}