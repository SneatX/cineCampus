class PeliculasDto{

    noExistingFuncionesTemplate(arg){
        return {
            status: 404,
            data: arg
        }
    }

    existingFunctionsTemplate(arg){
        return {
            status: 201,
            data: arg
        }
    }

    catalogoTemplate(arg){
        return {
            status: 201,
            data: arg
        }
    }

}

module.exports = {
    PeliculasDto
}