const { body } = require("express-validator")

exports.newUserValidation = () => {
    return [
        body('id_tarjeta'),
        body('nombre').notEmpty().isString().withMessage('Debe ingresar un string para el nombre'),
        body('apellido').isString().withMessage('Debe ingresar un string para el apellido'),
        body('nick').notEmpty().isString().withMessage('Debe ingresar un nick como string'),
        body('email').notEmpty().isEmail().withMessage('El email no es valido'),
        body('telefono').notEmpty().isEmail().withMessage('El email no es valido')
    ];
};