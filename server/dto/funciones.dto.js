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

}

module.exports = {
    FuncionesDto
};
