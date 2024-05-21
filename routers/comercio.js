const express = require("express");
const router = express.Router();
const { getComercios, crearComercio, obtenerComercioPorId, actualizarComercio, eliminarComercio} = require("../controllers/comercioController");
const { validatorCreateComercio, validatorGetComercio } = require("../validators/comercio")
const verificarTokenC = require("../middleware/verificarTokenComercio");
const verificarToken = require("../middleware/verificarToken");
const checkRol = require("../middleware/rol")

// Ruta para obtener todos los comercios
router.get("/", getComercios);

// Ruta para obtener un comercio por su ID
router.get("/:id", validatorGetComercio,obtenerComercioPorId);

// Ruta para crear un nuevo comercio
router.post("/", verificarToken ,validatorCreateComercio, checkRol(["admin"]), crearComercio);

// Ruta para actualizar un comercio por su ID
router.put("/:id" , verificarTokenC ,validatorGetComercio, actualizarComercio);

// Ruta para eliminar un comercio
router.delete("/:id", validatorGetComercio,eliminarComercio); 

module.exports = router;