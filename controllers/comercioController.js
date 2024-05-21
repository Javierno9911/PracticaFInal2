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

        // Crear el comercio con los datos proporcionados
        const comercio = await Comercio.create(comercioData);

        // Generar un token JWT asociado al comercio creado
        const token = await tokenSign(comercio);

        // Guardar el token en el comercio
        comercio.token = token;
        await comercio.save();

        // Enviar una respuesta con el comercio creado y el token JWT
        res.status(201).send({ comercio, token });
    } catch (err) {
        console.error(err);
        handleHttpError(res, "ERROR_CREAR_COMERCIO");
    }
};

/**
 * Obtener un comercio por su ID
 * @param {*} req
 * @param {*} res
 */
const obtenerComercioPorId = async (req, res) => {
    try {
        const { id } = matchedData(req);
        
        // Buscar comercio por ID en la base de datos
        const comercio = await Comercio.findById(id);
        
        if (!comercio) {
            return res.status(404).send("Comercio no encontrado");
        }
        
        // Generar un token JWT asociado al comercio encontrado
        const token = await tokenSign(comercio);

        // Enviar respuesta con el comercio y el token JWT asociado
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
        const { id } = req.params;
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