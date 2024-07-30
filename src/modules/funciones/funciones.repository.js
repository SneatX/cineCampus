import { Connect } from "../../config/connnect.js";
import { ObjectId } from "mongodb";

export class FuncionesRepository extends Connect {
    static instance;
    constructor() {
        if (typeof FuncionesRepository.instance === 'object') {
            return FuncionesRepository.instance;
        }
        super();
        this.collection = this.db.collection('funciones');
        FuncionesRepository.instance = this;
        return this;
    }

    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion "funciones"
     */

    async getAllFunciones() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async getFuncionById(id){
        let [res] = await this.collection.find({_id: new ObjectId(id)}).toArray()
        return res
    }

    async getFuncionesByPeliculaId(idPelicula){
        let res = await this.collection.find({id_pelicula: new ObjectId(idPelicula)}).toArray()
        return res
    }

}