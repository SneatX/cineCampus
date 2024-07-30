import { FuncionesRepository } from "../funciones/funciones.repository.js";
import { PeliculasRepository } from "./peliculas.repository.js";

export async function verPelisCatalogo(){
    let peliculasCollection = new PeliculasRepository()
    let funcionesCollection = new FuncionesRepository()
    
    //Obtencion de los ids de las peliculas en cartelera
    let funciones = await funcionesCollection.getAllFunciones()
    let idsPelis = new Set()
    funciones.forEach(funcion => {
        idsPelis.add(funcion.id_pelicula.toString())
    })
    idsPelis = Array.from(idsPelis)

    let peliculas = await Promise.all(idsPelis.map(async idPeli =>{
        let res = await peliculasCollection.getPeliculaById(idPeli)
        let horarios = await funcionesCollection.getFuncionesByPeliculaId(idPeli)
        horarios = horarios.map(funcion =>{
            return funcion.fecha_inicio
        })
        return {
            titulo: res.titulo,
            generos: res.generos,
            duracion: res.duracion,
            horarios: horarios
        }
    }))

    return peliculas
}