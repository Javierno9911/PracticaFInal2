const WebComercio = require('../models/nosql/publicaciones');
const { matchedData } = require('express-validator');
const { tokenSign } = require("../utils/handleJwt");
const {handleHttpError} = require("../utils/handleHttpError");

/**
 * Obtener lista de páginas web de comercios
 * @param {*} req
 * @param {*} res
 */
const getPaginasWebComercio = async (req, res) => {
    try {
        const data = await WebComercio.find({});
        res.send(data);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al obtener la lista de páginas web de comercios");
    }
}

/**
 * Crear una nueva página web de comercio
 * @param {*} req
 * @param {*} res
 */
const crearPaginaWebComercio = async (req, res) => {
    try {
        const paginaWebData = req.body;
        const paginaWeb = await WebComercio.create(paginaWebData);
        res.status(201).send(paginaWeb);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al crear una nueva página web de comercio");
    }
}

/**
 * Obtener una página web de comercio por su ID
 * @param {*} req
 * @param {*} res
 */
const obtenerPaginaWebComercioPorId = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const paginaWeb = await WebComercio.findById(id);
        if (!paginaWeb) {
            return res.status(404).send("Página web de comercio no encontrada");
        }
        res.send(paginaWeb);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al obtener la página web de comercio");
    }
}
/**
 * Obtener lista de usuarios
 * @param {*} req
 * @param {*} res
 */
const obtenerPaginasPorActividad = async (req, res) => {
    try {
        const { actividad } = req.params; // Obtener el parámetro de actividad desde la URL
        console.log("Actividad recibida:", actividad);

        // Buscar páginas web por actividad usando una consulta a la base de datos
        const paginasWeb = await WebComercio.find({ actividad: actividad });

        if (paginasWeb.length === 0) {
            return res.status(404).send(`No se encontraron páginas web con la actividad '${actividad}'`);
        }

        res.send(paginasWeb);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al obtener páginas web por actividad");
    }
}

/**
 * Obtener lista de usuarios
 * @param {*} req
 * @param {*} res
 */

const obtenerPaginaWebComercioPorCiudad = async (req, res) => {
    try {
        const { ciudad } = req.params; // Obtener el parámetro de actividad desde la URL
        console.log("Actividad recibida:", ciudad);

        // Buscar páginas web por actividad usando una consulta a la base de datos
        const paginasWeb = await WebComercio.find({ ciudad: ciudad });

        if (paginasWeb.length === 0) {
            return res.status(404).send(`No se encontraron páginas web con la actividad '${ciudad}'`);
        }

        res.send(paginasWeb);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al obtener páginas web por actividad");
    }
}

/**
 * Actualizar una página web de comercio por su ID
 * @param {*} req
 * @param {*} res
 */
const actualizarPaginaWebComercio = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const datosActualizados = req.body;
        const paginaWebActualizada = await WebComercio.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!paginaWebActualizada) {
            return res.status(404).send("Página web de comercio no encontrada");
        }
        res.send(paginaWebActualizada);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al actualizar la página web de comercio");
    }
}

/**
 * Eliminar una página web de comercio por su ID
 * @param {*} req
 * @param {*} res
 */
const eliminarPaginaWebComercio = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del parámetro de la ruta
        const paginaWebEliminada = await WebComercio.findByIdAndDelete(id);
        if (!paginaWebEliminada) {
            return res.status(404).send("Página web de comercio no encontrada");
        }
        res.send("Página web de comercio eliminada correctamente");
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al eliminar la página web de comercio");
    }
}

module.exports = { getPaginasWebComercio, crearPaginaWebComercio, obtenerPaginaWebComercioPorId, obtenerPaginaWebComercioPorCiudad,obtenerPaginasPorActividad ,actualizarPaginaWebComercio, eliminarPaginaWebComercio  };