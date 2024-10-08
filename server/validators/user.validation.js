const { body, query } = require('express-validator');

exports.getClientByNickValidation = () =>{
    return[
        query('nick')
        .exists().withMessage('El parámetro "nick" es requerido en la query')
        .isString().withMessage('El "nick" debe ser un string'),
        body().custom((value, { req }) => {
            if (Object.keys(req.body).length > 0) {
                throw new Error('No se envia nada en el body');
            }
            return true;
        })
    ]
}

exports.newUserValidation = () => {
    return [
        body('id_tarjeta')
            .optional({ nullable: true, checkFalsy: true })
            .isMongoId()
            .withMessage('El id_tarjeta debe ser un codigo hexadecimal de mongo o objectId'),
        body('nombre')
            .notEmpty()
            .isString()
            .withMessage('Debe ingresar un string para el nombre'),
        body('apellido')
            .optional({ nullable: true, checkFalsy: true })
            .isString()
            .withMessage('Debe ingresar un string para el apellido'),
        body('nick')
            .notEmpty()
            .isString()
            .withMessage('Debe ingresar un nick como string'),
        body('email')
            .notEmpty()
            .isEmail()
            .withMessage('El email no es valido'),
        body('telefono')
            .notEmpty()
            .isNumeric()
            .withMessage('El numero de telefono no es valido'),
        body('pass')
            .notEmpty()
            .isStrongPassword()
            .withMessage('Debe ingresar una contraseña segura'),
        query().custom((value, { req }) => {
            if (Object.keys(req.query).length > 0) {
                throw new Error('No se envia nada en la query');
            }
            return true;
        })
    ];
};
