const { Connect } = require('../index.js');

class SalasRepository extends Connect {
    static instance;
    constructor() {
        if (typeof SalasRepository.instance === 'object') {
            return SalasRepository.instance;
        }
        super();
        this.collection = this.db.collection('salas');
        SalasRepository.instance = this;
        return this;
    }

    /**
     *
     * @param
     * @returns Retorna un array con todos los elementos de la coleccion "salas"
     */

    async getAllSalas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }
}

module.exports = {
    SalasRepository
}