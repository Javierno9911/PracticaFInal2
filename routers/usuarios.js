const express = require("express");
const router = express.Router();
const { getUsuarios, crearUsuario, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario} = require("../controllers/usuarioController");
const { validatorCreateUser, validatorGetUser } = require("../validators/usuario")

/**
 * @openapi
 * /api/usuario/tablaDeUsuario:
 *  get:
 *      tags:
 *      - User
 *      summary: Get users in the System
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/", getUsuarios);

// Ruta para obtener un usuario por su ID
router.get("/:id",validatorGetUser, obtenerUsuarioPorId);

/**
 * @openapi
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */
router.post("/", validatorCreateUser, crearUsuario);

// Ruta para actualizar un usuario por su ID
router.put("/:id", validatorGetUser,actualizarUsuario);

// Ruta para eliminar un usuario por su ID
router.delete("/:id", validatorGetUser,eliminarUsuario);

module.exports = router;