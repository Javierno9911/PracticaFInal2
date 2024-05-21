const express = require("express");
const router = express.Router();
const { getAdminRol, getMiembro, crearMiembro, obtenerMiembroID, obtenerMiembroPorIntereses,obtenerMiembroCiudad, actualizarMiembro, eliminarMiembro} = require("../controllers/controlController");
const { validatorCreateControl, validatorGetControl } = require("../validators/control")
const verificarToken = require("../middleware/verificarToken");
const checkRol = require("../middleware/rol")

router.get("/", getMiembro);

router.get("/rol/:rol",getAdminRol);

// Ruta para obtener un usuario por su ID
router.get("/:id", validatorGetControl, obtenerMiembroID);

// Ruta para obtener un usuario por su CIUDAD
router.get("/ciudad/:ciudad", obtenerMiembroCiudad);

router.get("/intereses/:interes", obtenerMiembroPorIntereses);

// Ruta para crear usuarios.
router.post("/register", validatorCreateControl, crearMiembro);

// Ruta para actualizar un usuario por su ID
router.put("/:id", verificarToken,validatorGetControl,actualizarMiembro);

// Ruta para eliminar un usuario por su ID
router.delete("/:id", validatorGetControl,eliminarMiembro);

module.exports = router;