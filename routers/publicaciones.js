const express = require("express");
const router = express.Router();
const { getPaginasWebComercio, crearPaginaWebComercio, obtenerPaginaWebComercioPorId, actualizarPaginaWebComercio, eliminarPaginaWebComercio  } = require("../controllers/publicacionController");

// Ruta para obtener todas las páginas web de comercios
router.get("/", getPaginasWebComercio);

// Ruta para crear una nueva página web de comercio
router.post("/", crearPaginaWebComercio);

// Ruta para obtener una página web de comercio por su ID
router.get("/:id", obtenerPaginaWebComercioPorId);

// Ruta para actualizar una página web de comercio por su ID
router.put("/:id", actualizarPaginaWebComercio);

// Ruta para eliminar una página web de comercio
router.delete("/:id", eliminarPaginaWebComercio);

module.exports = router;