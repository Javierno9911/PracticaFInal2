const Usuario = require('../models/nosql/usuarios');
const { matchedData } = require('express-validator');

/**
 * Obtener lista de usuarios
 * @param {*} req
 * @param {*} res
 */
const getUsuarios = async (req, res) => {
    try {
        const data = await Usuario.find({});
        res.send(data);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al obtener la lista de usuarios");
    }
}

/**
 * Crear un nuevo usuario
 * @param {*} req
 * @param {*} res
 */
const crearUsuario = async (req, res) => {
    try {
        const usuarioData = req.body;
        const usuario = await Usuario.create(usuarioData);
        res.status(201).send(usuario);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al crear un nuevo usuario");
    }
}

/**
 * Obtener un usuario por su ID
 * @param {*} req
 * @param {*} res
 */
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.send(usuario);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al obtener el usuario");
    }
}

/**
 * Actualizar un usuario por su ID
 * @param {*} req
 * @param {*} res
 */
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const datosActualizados = req.body;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!usuarioActualizado) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.send(usuarioActualizado);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al actualizar el usuario");
    }
}

module.exports = { getUsuarios, crearUsuario, obtenerUsuarioPorId, actualizarUsuario };