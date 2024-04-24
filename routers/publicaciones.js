const express = require("express");
const router = express.Router();
const { getPaginasWebComercio, crearPaginaWebComercio, obtenerPaginaWebComercioPorId, actualizarPaginaWebComercio } = require("../controllers/publicacionesController");

// Ruta para obtener todas las páginas web de comercios
router.get("/", getPaginasWebComercio);

// Ruta para crear una nueva página web de comercio
router.post("/", crearPaginaWebComercio);

// Ruta para obtener una página web de comercio por su ID
router.get("/:id", obtenerPaginaWebComercioPorId);

// Ruta para actualizar una página web de comercio por su ID
router.put("/:id", actualizarPaginaWebComercio);

module.exports = router;