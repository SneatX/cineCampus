class ClientesDto {
    okTemplate(arg = null) {
        return {
            status: 200,
            data: arg
        };
    }

    nonExistentClient(id){
        return {
            status: 404,
            message: "Id del cliente no registrado en la base de datos",
            id: id
        }
    }

    newAdminTemplate(arg) {
        return {
            status: 201,
            data: arg
        };
    }

    repeatedNick(nick) {
        return {
            status: 400,
            msg: 'Nick anteriormente registrado',
            nick: nick
        };
    }

    repeatedEmail(email) {
        return {
            status: 400,
            msg: 'Email anteriormente registrado',
            email: email
        };
    }

    repeatedTarjeta(id_tarjeta) {
        return {
            status: 400,
            msg: 'id tarjeta registrado a otro usuario',
            tarjeta: id_tarjeta
        };
    }

    newClientTemplate(obj) {
        return {
            status: 201,
            msg: 'Usuario creado exitosamente',
            data: obj
        };
    }
}

module.exports = {
    ClientesDto
};
