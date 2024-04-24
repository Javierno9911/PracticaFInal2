const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
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

module.exports = mongoose.model("Usuario", usuarioSchema);

/*
Se define un nuevo modelo de Mongoose, este tendra todos los campos que necesita nuestra base de datos de comercio. Este esquema especifica la 
estructura de los documentos que se guardarán en la colección de MongoDB asociada.

Este modelo luego se usara para realizar las operaciones CRUD sobre el.
*/