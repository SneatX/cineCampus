const { body, query } = require('express-validator');

exports.buyTicketValidation = () => {
    return [
        query().custom((value, { req }) => {
            if (Object.keys(req.body).length > 0) {
                throw new Error('El cuerpo de la solicitud debe estar vacío');
            }
            return true;
        }),
        body("idFuncion")
        .exists().withMessage('El parámetro "idFuncion" es requerido en el body')
        .isString().withMessage('El parámetro "idFuncion" debe ser un string')
        .isLength({ min: 24, max: 24 }).withMessage('El parámetro "idFuncion" debe tener exactamente 24 caracteres')
        .matches(/^[a-fA-F0-9]{24}$/).withMessage('El parámetro "idFuncion" debe ser una cadena hexadecimal de 24 caracteres'),
        body("idCliente")
        .exists().withMessage('El parámetro "idCliente" es requerido en el body')
        .isString().withMessage('El parámetro "idCliente" debe ser un string')
        .isLength({ min: 24, max: 24 }).withMessage('El parámetro "idCliente" debe tener exactamente 24 caracteres')
        .matches(/^[a-fA-F0-9]{24}$/).withMessage('El parámetro "idCliente" debe ser una cadena hexadecimal de 24 caracteres'),
        body("asiento")
        .matches(/^[A-G](0|[1-2][0-9]|3[0-5])$/)
        .withMessage('El string debe comenzar con una letra mayúscula de A a G seguida por un número entre 0 y 35'),
    ];
};