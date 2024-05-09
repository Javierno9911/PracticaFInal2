const Comercio = require('../models/nosql/comercio');
const { matchedData } = require('express-validator');
const { tokenSign } = require("../utils/handleJwt");
const {handleHttpError} = require("../utils/handleHttpError");

/**
 * Obtener lista de comercios
 * @param {*} req
 * @param {*} res
 */
const getComercios = async (req, res) => {
    try {
        const data = await Comercio.find({});
        res.send(data);
    } catch(err) {
        console.error(err);
        handleHttpError(res, "ERROR_OBTENER_COMERCIO");
    }
}

/**
 * Crear un nuevo comercio
 * @param {*} req
 * @param {*} res
 */
const crearComercio = async (req, res) => {
    try {
        const comercioData = req.body;

        // Crear el comercio con los datos recibidos
        const comercio = await Comercio.create(comercioData);

        // Generar un token JWT para el comercio creado
        const token = await tokenSign(comercio);

        // Devolver el comercio junto con el token JWT en la respuesta
        res.status(201).send({ comercio, token });
    } catch(err) {
        console.error(err);
        handleHttpError(res, "ERROR_CREAR_COMERCIO");
    }
}

/**
 * Obtener un comercio por su ID
 * @param {*} req
 * @param {*} res
 */
const obtenerComercioPorId = async (req, res) => {
    try {
        const { id } = matchedData(req);
        
        // Buscar el comercio por su ID en la base de datos
        const comercio = await Comercio.findById(id);
        
        if (!comercio) {
            return res.status(404).send("Comercio no encontrado");
        }
        
        // Generar un token JWT para el comercio encontrado
        const token = await tokenSign(comercio);

        // Devolver el comercio junto con el token JWT en la respuesta
        res.send({ comercio, token });
    } catch(err) {
        console.error(err);
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}

/**
 * Actualizar un comercio por su ID
 * @param {*} req
 * @param {*} res
 */
const actualizarComercio = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const datosActualizados = req.body;
        const comercioActualizado = await Comercio.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!comercioActualizado) {
            return res.status(404).send("Comercio no encontrado");
        }
        res.send(comercioActualizado);
    } catch(err) {
        console.error(err);
        handleHttpError(res, "ERROR_EDITAR_USER");
    }
}

/**
 * Eliminar un comercio por su ID
 * @param {*} req
 * @param {*} res
 */
const eliminarComercio = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del parámetro de la ruta
        const comercioEliminado = await Comercio.findByIdAndDelete(id);
        if (!comercioEliminado) {
            return res.status(404).send("Comercio no encontrado");
        }
        res.send("Comercio eliminado correctamente");
    } catch(err) {
        console.error(err);
        handleHttpError(res, "ERROR_ELIMINAR_USER");
    }
}

module.exports = { getComercios, crearComercio, obtenerComercioPorId, actualizarComercio, eliminarComercio};