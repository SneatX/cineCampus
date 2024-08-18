const { Connect } = require('../index.js');
const { ObjectId } = require('mongodb');

class TarjetasRepository extends Connect {
    static instance;
    constructor() {
        if (typeof TarjetasRepository.instance === 'object') {
            return TarjetasRepository.instance;
        }
        super();
        this.collection = this.db.collection('tarjetas');
        TarjetasRepository.instance = this;
        return this;
    }

    /**
     *
     * @param
     * @returns Retorna un array con todos los elementos de la coleccion "tarjetas"
     */

    async getAllTarjetas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async getTarjetaById(id) {
        let [res] = await this.collection
            .find({ _id: new ObjectId(id) })
            .toArray();
        return res;
    }
}

module.exports = {
    TarjetasRepository
};
