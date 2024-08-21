const { body, query } = require('express-validator');

exports.getSeatsValidation = () => {
    return [
        query('id')
        .exists().withMessage('El parámetro "id" es requerido en la query')
        .isMongoId().withMessage('El id debe ser un codigo hexadecimal de mongo o objectId'),
        
        body().custom((value, { req }) => {
            if (Object.keys(req.body).length > 0) {
                throw new Error('el body de la solicitud debe estar vacío');
            }
            return true;
        }),
    ];
};