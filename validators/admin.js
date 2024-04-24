const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/*
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
*/

const validatorCreateAdmin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetAdmin = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
      return validateResults(req, res, next);
  }
];
module.exports = { validatorCreateAdmin, validatorGetAdmin };
