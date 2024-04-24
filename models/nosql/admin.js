const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    unique: true // Asegura que cada correo electrónico sea único en la base de datos
  },
  password:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Admin", adminSchema);