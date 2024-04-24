const Comercio = require('../models/nosql/comercio');
const { matchedData } = require('express-validator');

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
        res.status(500).send("Error al obtener la lista de comercios");
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
        const comercio = await Comercio.create(comercioData);
        res.status(201).send(comercio);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al crear un nuevo comercio");
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
        const comercio = await Comercio.findById(id);
        if (!comercio) {
            return res.status(404).send("Comercio no encontrado");
        }
        res.send(comercio);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al obtener el comercio");
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
        res.status(500).send("Error al actualizar el comercio");
    }
}

module.exports = { getComercios, crearComercio, obtenerComercioPorId, actualizarComercio };