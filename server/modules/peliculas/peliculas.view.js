//import { verInformacionPelicula } from './peliculas.controller.js';
const { verPelisCatalogo, verInformacionPelicula } = require('./peliculas.controller.js');

async function casoUso2() {
    let res = await verPelisCatalogo();
    console.log(res);
}

async function casoUso3() {
    let idPeli = '66a8951e6cf86599a0039395';

    let res = await verInformacionPelicula(idPeli);
    console.log(res);
}

module.exports = {
    casoUso2,
    casoUso3
}
