const mongoose = require('mongoose');

const comercioSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  CIF: { 
    type: String, 
    required: true,
    unique: true // Asegura que cada CIF sea único en la base de datos
  },
  direccion: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    unique: true // Asegura que cada correo electrónico sea único en la base de datos
  },
  telefono: { 
    type: String, 
    required: true 
  }
});

module.exports = mongoose.model("Comercio", comercioSchema);
