import { Connect } from "../../config/connnect.js";

export class ClientesRepository extends Connect {
    static instance;
    constructor() {
        if (typeof ClientesRepository.instance === 'object') {
            return ClientesRepository.instance;
        }
        super();
        this.collection = this.db.collection('clientes');
        ClientesRepository.instance = this;
        return this;
    }

    /**
     * 
     * @param 
     * @returns Retorna un array con todos los elementos de la coleccion "clientes"
     */

    async getAllClientes() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async getClienteById(id){
        let res = await this.collection.find({_id: new ObjectId()})
    }

    async agreggateNewClient(object){
        let res = await this.collection.insertOne(object)
        return res
    }

    async createNewUser(apodo, pwd, rol) {
        const newUser = await this.db.command({
            createUser: apodo,
            pwd: pwd,
            roles: [
              { role: rol, db: this.db.databaseName }
            ]
        });

        return newUser
    }
}