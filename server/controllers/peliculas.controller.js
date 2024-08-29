const { FuncionesRepository } = require('../model/funciones.model.js');
const { PeliculasRepository } = require('../model/peliculas.model.js');
const { validationResult } = require('express-validator');

const { PeliculasDto } = require('../dto/peliculas.dto');
const { FuncionesDto } = require('../dto/funciones.dto.js')
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
    let peliculasDto = new PeliculasDto();

    let peliculasCollection = new PeliculasRepository();
    let funcionesCollection = new FuncionesRepository();

    //Obtencion de los ids de las peliculas en cartelera
    let funciones = await funcionesCollection.getAllFunciones();
    let data =
        funciones.length < 1
            ? peliculasDto.noExistingFuncionesTemplate(funciones)
            : peliculasDto.existingFunctionsTemplate(funciones);

    if (data.status === 404) res.status(data.status).json(data);

    let idsPelis = new Set();
    funciones.forEach((funcion) => {
        idsPelis.add(funcion.id_pelicula.toString());
    });
    idsPelis = Array.from(idsPelis);

    let peliculas = await Promise.all(
        idsPelis.map(async (idPeli) => {
            let res = await peliculasCollection.getPeliculaById(idPeli);
            let resHorarios =
                await funcionesCollection.getFuncionesByPeliculaId(idPeli);
            let horarios = resHorarios.filter((funcion) => {
                let fechaActual = new Date()
                if(fechaActual < funcion.fecha_inicio){
                    return funcion.fecha_inicio
                }
            });
            if(horarios.length > 0){
                return {
                    id: res._id,
                    titulo: res.titulo,
                    generos: res.generos,
                    duracion: res.duracion,
                    horarios: horarios,
                    img: res.img
                };
            }
        })
    );

    peliculas = peliculas.filter(pelicula => pelicula !== undefined);

    
    data = peliculasDto.catalogoTemplate(peliculas);
    res.status(data.status).json(data);
}

async function funcionesByMovie(req, res){
    try{
        let funcionesCollection = new FuncionesRepository();
        let idPelicula = req.query.id
    
        let funciones = await funcionesCollection.getFuncionesByPeliculaId(idPelicula)
        
        res.status(200).json(funciones)
    } catch(err){
        console.log(err)
    }

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

async function verInformacionPelicula(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    let peliculasCollection = new PeliculasRepository();
    let funcionesCollection = new FuncionesRepository();
    let peliculasDto = new PeliculasDto()
    let funcionesDto = new FuncionesDto()
    let idPelicula = req.query.id

    let pelicula = await peliculasCollection.getPeliculaById(idPelicula);
    let dtoRes = !pelicula ? peliculasDto.noMoviesTemplate() : peliculasDto.okTemplate(pelicula)
    
    if(dtoRes.status === 404) return res.status(dtoRes.status).json(dtoRes);
    
    pelicula.horarios = [];
    let funciones = await funcionesCollection.getFuncionesByPeliculaId(idPelicula);
    dtoRes = !funciones.length ? funcionesDto.noFunctionsTemplate() : funcionesDto.okTemplate()

    //Retornar si no tiene funciones con horarios vacio
    if(dtoRes.status === 404) return res.status(200).json(pelicula);

    let horarios = (funciones = funciones.map((funcion) => {
        return funcion.fecha_inicio;
    }));
    pelicula.horarios = horarios;
    return res.status(200).json(pelicula);
}

module.exports = {
    verPelisCatalogo,
    verInformacionPelicula,
    funcionesByMovie
};
