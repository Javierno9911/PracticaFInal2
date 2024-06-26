const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  rol: { 
    type: String, 
    required: true,
  },
  email: { 
    type: String, 
    required: true,
    unique: true // Asegura que cada correo electrónico sea único en la base de datos
  },
  password:{
    type: String,
    required: true
  },
  edad:{
    type: Number, // Utiliza el tipo Number para la edad
    required: true
  },
  ciudad: { 
    type: String, 
    required: true 
  },
  intereses: { 
    type: [String], // Puedes utilizar un array de Strings para los intereses
    required: true 
  },
  permiteRecibirOfertas: {
    type: Boolean, // Utiliza el tipo Boolean para indicar si el usuario permite recibir ofertas
    default: true // Establece un valor predeterminado
  }
});

module.exports = mongoose.model("Control", usuarioSchema);