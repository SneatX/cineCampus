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

    async getFuncionById(id) {
        let [res] = await this.collection.find({ _id: new ObjectId(id) }).toArray()
        return res
    }

    async getFuncionesByPeliculaId(idPelicula) {
        let res = await this.collection.find({ id_pelicula: new ObjectId(idPelicula) }).toArray()
        return res
    }

    async aggregateNewAsientoOcupado(idFuncion, asiento) {
        let res = await this.collection.updateOne(
            { _id: new ObjectId(idFuncion)},
            { $push: { asientosOcupados: asiento} }
        );
        return res;
    }

    async getAsientosFuncion(id) {
        let [res] = await this.collection.aggregate([
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                "$lookup": {
                    "from": "salas",
                    "localField": "id_sala",
                    "foreignField": "_id",
                    "as": "sala_info"
                }
            },
            {
                "$unwind": "$sala_info"
            },
            {
                "$project": {
                    "_id": 0,
                    "asientosOcupados": 1,
                    "limitFila": "$sala_info.limitFila",
                    "limitCol": "$sala_info.limitCol"
                }
            }
        ]).toArray()
        return res
    }

}