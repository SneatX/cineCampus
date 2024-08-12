import { verPelisCatalogo } from './peliculas.controller.js';
import { verInformacionPelicula } from './peliculas.controller.js';

export async function casoUso2() {
    let res = await verPelisCatalogo();
    console.log(res);
}

export async function casoUso3() {
    let idPeli = '66a8951e6cf86599a0039395';

    let res = await verInformacionPelicula(idPeli);
    console.log(res);
}
