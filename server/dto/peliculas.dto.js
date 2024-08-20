class PeliculasDto {

    noExistingFuncionesTemplate(arg) {
        return {
            status: 404,
            data: arg
        };
    }

    existingFunctionsTemplate(arg) {
        return {
            status: 201,
            data: arg
        };
    }

    catalogoTemplate(arg) {
        return {
            status: 201,
            data: arg
        };
    }

    noMoviesTemplate(){
        return {
            status: 404,
            message: "El id de la pelicula no existe en la base de datos"
        };
    }

    okTemplate(arg = null){
        return {
            status: 200,
            message: arg
        };
    }
}

module.exports = {
    PeliculasDto
};
