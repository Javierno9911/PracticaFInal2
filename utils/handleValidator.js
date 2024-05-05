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
