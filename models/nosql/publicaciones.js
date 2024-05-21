const mongoose = require('mongoose');

const webSchema = new mongoose.Schema({
  comercioId: {
    type: mongoose.Schema.Types.ObjectId, // Referencia al comercio al que pertenece esta página web
    ref: 'Comercio', // Nombre del modelo al que hace referencia
    required: true,
    unique: true
  },
  ciudad: {
    type: String,
    required: true
  },
  actividad: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  resumen: {
    type: String,
    required: true
  },
  textos: [{
    type: String // Array de strings para los textos adicionales
  }],
  fotos: [{
    type: String // Array de strings para las URLs de las fotos
  }],
  datosNoModificables: {
    scoring: {
      type: Number,
      default: 0 // Valor por defecto para el scoring
    },
    numeroPuntuaciones: {
      type: Number,
      default: 0 // Valor por defecto para el número de puntuaciones
    },
    resenhas: [{
      type: String // Array de strings para las reseñas de los usuarios
    }]
  }
});

module.exports = mongoose.model("WebComercio", webSchema);