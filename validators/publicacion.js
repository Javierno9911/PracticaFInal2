const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/*
  comercioId: {type: mongoose.Schema.Types.ObjectId, // Referencia al comercio al que pertenece esta página web
    ref: 'Comercio', // Nombre del modelo al que hace referencia
    required: true
  },
  tokenJWT: {type: String,required: true},
  ciudad: {type: String,required: true},
  actividad: {type: String,required: true},
  titulo: {type: String,required: true},
  resumen: {type: String,required: true},
  textos: [{type: String // Array de strings para los textos adicionales}],
  fotos: [{type: String // Array de strings para las URLs de las fotos}],
  datosNoModificables: {
    scoring: {type: Number,default: 0 // Valor por defecto para el scoring},
    numeroPuntuaciones: {type: Number, default: 0 // Valor por defecto para el número de puntuaciones},
    resenhas: [{type: String // Array de strings para las reseñas de los usuarios}]
  }
*/

const validatorCreateItem = [
    check("comercioId").exists().notEmpty().isMongoId(),
    check("ciudad").exists().notEmpty(),
    check("actividad").exists().notEmpty(),
    check("titulo").exists().notEmpty(),
    check("resumen").exists().notEmpty(),
    check("textos").exists().notEmpty(),
    check("fotos").exists().notEmpty(),
    check("datosNoModificables").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateItem, validatorGetItem };