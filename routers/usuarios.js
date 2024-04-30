const express = require("express");
const router = express.Router();
const { getUsuarios, crearUsuario, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario} = require("../controllers/usuarioController");
const { validatorCreateUser, validatorGetUser } = require("../validators/usuario")

// Ruta para obtener todos los usuarios
router.get("/", getUsuarios);

// Ruta para obtener un usuario por su ID
router.get("/:id",validatorGetUser, obtenerUsuarioPorId);

// Ruta para crear usuarios.
router.post("/", validatorCreateUser, crearUsuario);

// Ruta para actualizar un usuario por su ID
router.put("/:id", validatorGetUser,actualizarUsuario);

// Ruta para eliminar un usuario por su ID
router.delete("/:id", validatorGetUser,eliminarUsuario);

module.exports = router;