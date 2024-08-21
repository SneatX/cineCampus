class BoletasDto {
    okTemplate(arg = null) {
        return {
            status: 200,
            data: arg
        };
    }

    createdTemplate(boleta){
        return {
            status: 201,
            message: 'boleta creada correctamente',
            data: boleta
        }
    }

    nonExistentRow(row){
        return {
            status: 400,
            data: row,
            message: 'La fila ingresada excede los limites de la sala'
        };
    }

    nonExistentColumn(column){
        return {
            status: 400,
            data: column,
            message: 'La columna ingresada excede los limites de la sala'
        };
    }

    occupiedSeat(seat){
        return {
            status: 400,
            data: seat,
            message: 'Asiento ocupado'
        };
    }

}

module.exports = {
    BoletasDto
};
