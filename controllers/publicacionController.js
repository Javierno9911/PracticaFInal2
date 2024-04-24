const WebComercio = require('../models/nosql/publicaciones');
const { matchedData } = require('express-validator');

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

module.exports = { getPaginasWebComercio, crearPaginaWebComercio, obtenerPaginaWebComercioPorId, actualizarPaginaWebComercio };