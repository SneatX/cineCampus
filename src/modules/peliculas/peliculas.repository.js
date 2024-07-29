import { Connect } from "../../config/connnect.js";

export class PeliculasRepository extends Connect {
    static instance;
    constructor() {
        if (typeof PeliculasRepository.instance === 'object') {
            return PeliculasRepository.instance;
        }
        super();
        this.collection = this.db.collection('peliculas');
        PeliculasRepository.instance = this;
        return this;
    }

    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion "peliculas"
     */

    async getAllPeliculas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}