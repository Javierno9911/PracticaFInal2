const { validationResult } = require("express-validator")
const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(403) // Por ahora lo dejamos como no permitido
        res.send(err)
    }
}
module.exports = validateResults

/*
Esta funcion se utiliza como middleware para validar los resultados de las validaciones.

Se utiliza validationResult(req).throw() para obtener los resultados de la validación realizada en la solicitud y lanzar un error si hay errores de 
validación.

Si no hay errores de validación, llama a next() para pasar el control al siguiente middleware.


*/