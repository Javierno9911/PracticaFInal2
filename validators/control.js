const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/*
  nombre: { type: String, required: true },
  rol: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  edad: { type: Number, required: true },
  ciudad: { type: String, required: true },
  intereses: { type: [String], required: true },
  permiteRecibirOfertas: { type: Boolean, default: true } 
*/

const validatorCreateControl = [
    check("nombre").exists().notEmpty(),
    check("rol").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty(),
    check("edad").exists().notEmpty().isInt({ min: 0 }),
    check("ciudad").exists().notEmpty(),
    check("intereses").exists().isArray().notEmpty(),
    check("permiteRecibirOfertas").optional().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetControl = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateControl, validatorGetControl };