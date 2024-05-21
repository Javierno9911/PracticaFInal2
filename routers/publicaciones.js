const express = require("express");
const router = express.Router();
const { getPaginasWebComercio, crearReseña, crearPaginaWebComercio, obtenerPaginaWebComercioPorId, obtenerPaginaWebComercioPorCiudad,obtenerPaginasPorActividad,actualizarPaginaWebComercio, eliminarPaginaWebComercio  } = require("../controllers/publicacionController");
const { validatorCreateItem, validatorGetItem } = require("../validators/publicacion")
const verificarTokenC = require("../middleware/verificarTokenComercio");
// Ruta para obtener todas las páginas web de comercios
router.get("/", getPaginasWebComercio);

router.patch("/:id", validatorGetItem, crearReseña);

// Ruta para obtener una página web de comercio por su ID
router.get("/:id", validatorGetItem , obtenerPaginaWebComercioPorId);

// Ruta para obtener un usuario por su CIUDAD
router.get("/ciudad/:ciudad", obtenerPaginaWebComercioPorCiudad);

// Ruta para obtener un usuario por su CIUDAD
router.get("/actividad/:actividad", obtenerPaginasPorActividad);

// Ruta para crear una nueva página web de comercio
router.post("/", validatorCreateItem, crearPaginaWebComercio);

// Ruta para actualizar una página web de comercio por su ID
router.put("/:id", verificarTokenC, validatorGetItem, actualizarPaginaWebComercio);

// Ruta para eliminar una página web de comercio
router.delete("/:id", validatorGetItem, eliminarPaginaWebComercio);

module.exports = router;