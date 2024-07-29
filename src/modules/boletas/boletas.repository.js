import { Connect } from "../../config/connnect.js";

export class BoletasRepository extends Connect {
    static instance;
    constructor() {
        if (typeof BoletasRepository.instance === 'object') {
            return BoletasRepository.instance;
        }
        super();
        this.collection = this.db.collection('boletas');
        BoletasRepository.instance = this;
        return this;
    }

    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion "boletas"
     */

    async getAllBoletas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

}