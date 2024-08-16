const { FuncionesRepository } = require('../model/funciones.model.js');
const { PeliculasRepository } = require('../model/peliculas.model.js');

const { PeliculasDto } = require("../dto/peliculas.dto")
/**
 * Obtiene el catálogo de películas en cartelera.
 * 
 * @returns {Array} - Retorna un array de objetos, cada uno representando una película en cartelera con sus horarios.
 * @returns {string} retorno[].titulo - El título de la película.
 * @returns {Array} retorno[].generos - Los géneros de la película.
 * @returns {number} retorno[].duracion - La duración de la película en horas.
 * @returns {Array} retorno[].horarios - Los horarios de las funciones de la película.
 */
async function verPelisCatalogo(req, res) {
    let peliculasDto = new PeliculasDto()

    let peliculasCollection = new PeliculasRepository();
    let funcionesCollection = new FuncionesRepository();

    //Obtencion de los ids de las peliculas en cartelera
    let funciones = await funcionesCollection.getAllFunciones();
    let data = 
    (funciones.length < 1) ?
    peliculasDto.noExistingFuncionesTemplate(funciones) :
    peliculasDto.existingFunctionsTemplate(funciones)

    if(data.status === 404) res.status(data.status).json(data)

    let idsPelis = new Set();
    funciones.forEach((funcion) => {
        idsPelis.add(funcion.id_pelicula.toString());
    });
    idsPelis = Array.from(idsPelis);

    let peliculas = await Promise.all(
        idsPelis.map(async (idPeli) => {
            let res = await peliculasCollection.getPeliculaById(idPeli);
            let horarios =
                await funcionesCollection.getFuncionesByPeliculaId(idPeli);
            horarios = horarios.map((funcion) => {
                return funcion.fecha_inicio;
            });
            return {
                titulo: res.titulo,
                generos: res.generos,
                duracion: res.duracion,
                horarios: horarios
            };
        })
    );
    
    data = peliculasDto.catalogoTemplate(peliculas)
    res.status(data.status).json(data)
}

/**
 * Obtiene la información detallada de una película específica.
 * 
 * @param {string} idPelicula - El ID de la película.
 * @returns {Object} - Retorna un objeto con la información de la película.
 * @returns {string} retorno.titulo - El título de la película.
 * @returns {Array} retorno.generos - Los géneros de la película.
 * @returns {number} retorno.duracion - La duración de la película en horas.
 * @returns {Array} retorno.horarios - Los horarios de las funciones de la película.
 */

async function verInformacionPelicula(idPelicula) {
    let peliculasCollection = new PeliculasRepository();
    let funcionesCollection = new FuncionesRepository();

    let pelicula = await peliculasCollection.getPeliculaById(idPelicula);
    let funciones =
        await funcionesCollection.getFuncionesByPeliculaId(idPelicula);
    let horarios = (funciones = funciones.map((funcion) => {
        return funcion.fecha_inicio;
    }));
    pelicula.horarios = horarios;
    return pelicula;
}

module.exports = {
    verPelisCatalogo,
    verInformacionPelicula
}
