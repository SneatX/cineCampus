const { body, query } = require('express-validator');

exports.getSeatsValidation = () => {
    return [
        query('id')
        .exists().withMessage('El parámetro "id" es requerido en la query')
        .isString().withMessage('El parámetro "id" debe ser un string')
        .isLength({ min: 24, max: 24 }).withMessage('El parámetro "id" debe tener exactamente 24 caracteres')
        .matches(/^[a-fA-F0-9]{24}$/).withMessage('El parámetro "id" debe ser una cadena hexadecimal de 24 caracteres'),
        
        body().custom((value, { req }) => {
            if (Object.keys(req.body).length > 0) {
                throw new Error('el body de la solicitud debe estar vacío');
            }
            return true;
        }),
    ];
};