const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/*
  nombre: { type: String, required: true },
  CIF: { type: String, required: true, unique: true },
  direccion: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true }
*/

const validatorCreateComercio = [
    check("nombre").exists().notEmpty(),
    check("CIF").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("telefono").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetComercio = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateComercio, validatorGetComercio };