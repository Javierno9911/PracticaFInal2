const express = require("express");
const router = express.Router();
const { getAdmins, createAdmin } = require("../controllers/adminController");

// Ruta para obtener todos los administradores
router.get("/", getAdmins);

// Ruta para crear un nuevo administrador
router.post("/", createAdmin);

module.exports = router;