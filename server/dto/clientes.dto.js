class ClientesDto{

    okTemplate(arg){
        return {
            status: 200,
            data: arg
        }
    }

    newAdminTemplate(arg){
        return {
            status: 201,
            data: arg
        }
    }
    
    repeatedAdminNick(){
        return {
            status: 400,
            msg: "Nick anteriormente registrado"
        }
    }

}

module.exports = {
    ClientesDto
}