const { Connect } = require('../index.js');
const { ObjectId } = require('mongodb');

class BoletasRepository extends Connect {
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

    async getBoletaById(idBoleta) {
        let [res] = await this.collection
            .find({ _id: new ObjectId(idBoleta) })
            .toArray();
        return res;
    }

    async deleteBoletaById(idBoleta) {
        let res = await this.collection.deleteOne({
            _id: new ObjectId(idBoleta)
        });
        return res;
    }

    async aggregatenewBoleta(boleta) {
        let res = await this.collection.insertOne(boleta);
        return res;
    }
}

module.exports = {
    BoletasRepository
};
