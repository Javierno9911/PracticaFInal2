const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/*
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password:{ type: String, required: true},
  edad:{ type: Number, required: true},
  ciudad: { type: String, required: true },
  intereses: { type: [String], required: true },
  permiteRecibirOfertas: { type: Boolean, default: true} 
*/

const validatorCreateUser = [
    check("nombre").exists().notEmpty(),
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

const validatorGetUser = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateUser, validatorGetUser };