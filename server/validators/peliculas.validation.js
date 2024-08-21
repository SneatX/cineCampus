const { body, query } = require('express-validator');

exports.getMovieDataValidation = () => {
    return [
        body().custom((value, { req }) => {
            if (Object.keys(req.body).length > 0) {
                throw new Error('El cuerpo de la solicitud debe estar vacío');
            }
            return true;
        }),
        query('id')
        .exists().withMessage('El parámetro "id" es requerido en la query')
        .isMongoId().withMessage('El id debe ser un codigo hexadecimal de mongo o objectId')
    ];
};