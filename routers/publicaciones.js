const express = require("express");
const router = express.Router();
const { getPaginasWebComercio, crearPaginaWebComercio, obtenerPaginaWebComercioPorId, actualizarPaginaWebComercio, eliminarPaginaWebComercio  } = require("../controllers/publicacionController");
const { validatorCreateItem, validatorGetItem } = require("../validators/publicacion")

// Ruta para obtener todas las páginas web de comercios
router.get("/", getPaginasWebComercio);

// Ruta para obtener una página web de comercio por su ID
router.get("/:id", validatorGetItem , obtenerPaginaWebComercioPorId);

// Ruta para crear una nueva página web de comercio
router.post("/", validatorCreateItem, crearPaginaWebComercio);

// Ruta para actualizar una página web de comercio por su ID
router.put("/:id", validatorGetItem, actualizarPaginaWebComercio);

// Ruta para eliminar una página web de comercio
router.delete("/:id", validatorGetItem, eliminarPaginaWebComercio);

module.exports = router;