const { body, query } = require('express-validator');

exports.buyTicketValidation = () => {
    return [
        query().custom((value, { req }) => {
            if (Object.keys(req.query).length > 0) {
                throw new Error('La query de la solicitud en la url debe estar vacío');
            }
            return true;
        }),
        body("idFuncion")
        .exists().withMessage('El parámetro "idFuncion" es requerido en el body')
        .isMongoId().withMessage('El idFuncion debe ser un codigo hexadecimal de mongo o objectId'),
        body("idCliente")
        .exists().withMessage('El parámetro "idCliente" es requerido en el body')
        .isMongoId().withMessage('El idCliente debe ser un codigo hexadecimal de mongo o objectId'),
        body("asiento")
        .matches(/^[A-Z](0?[1-9]|[1-9][0-9])$/)
        .withMessage("El string debe comenzar con una letra de 'a' a 'k' seguida por un número entre 1 y 10"),      
        body('pago')
        .exists().withMessage('El parámetro "pago" es requerido en el body')
        .isBoolean().withMessage('El parámetro "pago" debe ser un booleano (true o false)')
    ];
};