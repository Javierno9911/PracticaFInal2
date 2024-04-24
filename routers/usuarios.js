const express = require("express");
const router = express.Router();
const { getUsuarios, crearUsuario, obtenerUsuarioPorId, actualizarUsuario } = require("../controllers/usuarioController");

// Ruta para obtener todos los usuarios
router.get("/", getUsuarios);

// Ruta para obtener un usuario por su ID
router.get("/:id", obtenerUsuarioPorId);

// Ruta para crear un nuevo usuario
router.post("/", crearUsuario);

// Ruta para actualizar un usuario por su ID
router.put("/:id", actualizarUsuario);

module.exports = router;