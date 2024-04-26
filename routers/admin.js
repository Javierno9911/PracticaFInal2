const express = require("express");
const router = express.Router();
const { getAdmins, createAdmin } = require("../controllers/adminController");
const { validatorCreateAdmin, validatorGetAdmin } = require("../validators/admin")
// Ruta para obtener todos los administradores
router.get("/", getAdmins);

// Ruta para crear un nuevo administrador
router.post("/", validatorCreateAdmin, createAdmin);

module.exports = router;