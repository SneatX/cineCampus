class FuncionesDto {

    okTemplate(arg = null){
        return {
            status: 200,
            data: arg
        };
    }

    noFunctionsTemplate() {
        return {
            status: 404,
            message: "No existen funciones para esta pelicula"
        };
    }

    nonExistentFunction(arg){
        return {
            status: 404,
            message: "Id de funcion no registrado en la base de datos",
            id: arg
        }
    }

}

module.exports = {
    FuncionesDto
};
