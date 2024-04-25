const express = require("express");
const router = express.Router();
const { getComercios, crearComercio, obtenerComercioPorId, actualizarComercio, eliminarComercio} = require("../controllers/comercioController");

// Ruta para obtener todos los comercios
router.get("/", getComercios);

// Ruta para obtener un comercio por su ID
router.get("/:id", obtenerComercioPorId);

// Ruta para crear un nuevo comercio
router.post("/", crearComercio);

// Ruta para actualizar un comercio por su ID
router.put("/:id", actualizarComercio);

// Ruta para eliminar un comercio
router.delete("/:id", eliminarComercio); 

module.exports = router;