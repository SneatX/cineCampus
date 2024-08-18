const { Connect } = require('../index.js');
const { ObjectId } = require('mongodb');

class ClientesRepository extends Connect {
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

    async getClienteById(id) {
        let [res] = await this.collection
            .find({ _id: new ObjectId(id) })
            .toArray();
        return res;
    }

    async getClienteByNick(nick) {
        let [res] = await this.collection.find({ nick: nick }).toArray();
        return res;
    }

    async getUsuarioByNick(nick) {
        let {
            users: [res]
        } = await this.db.command({
            usersInfo: { user: nick, db: process.env.MONGO_DB }
        });
        return res;
    }

    async getAllUsuarios() {
        let { users: res } = await this.db.command({ usersInfo: 1 });
        return res;
    }

    async agreggateNewClient(object) {
        let res = await this.collection.insertOne(object);
        return res;
    }

    async createNewUser(apodo, pwd, rol, dbName) {
        const newUser = await this.db.command({
            createUser: apodo,
            pwd: pwd,
            roles: [{ role: rol, db: dbName }]
        });

        return newUser;
    }

    async changeRole(nick, newRole) {
        let {
            users: [user]
        } = await this.db.command({
            usersInfo: { user: nick, db: 'cineCampus' }
        });
        let roles = user.roles;

        let revoke = await this.db.command({
            revokeRolesFromUser: nick,
            roles: [{ role: roles[0].role, db: 'cineCampus' }]
        });

        let added = await this.db.command({
            grantRolesToUser: nick,
            roles: [{ role: newRole, db: 'cineCampus' }]
        });

        let {
            users: [newUser]
        } = await this.db.command({
            usersInfo: { user: nick, db: 'cineCampus' }
        });
        return newUser;
    }

    async getUserByNick(nick) {
        let {
            users: [user]
        } = await this.db.command({
            usersInfo: { user: nick, db: 'cineCampus' }
        });
        return user;
    }
}

module.exports = {
    ClientesRepository
};
