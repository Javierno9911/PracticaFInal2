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
 * Inserta reseñas
 * @param {*} req 
 * @param {*} res 
 */
// Función para manejar solicitudes PATCH de actualización parcial
const crearReseña = async (req, res) => {
    try {
        const { id } = req.params; // ID del documento WebComercio a actualizar
        const { scoring, numeroPuntuaciones, resenhas } = req.body.datosNoModificables;

        const updateData = {};
        if (scoring !== undefined) {
            updateData['datosNoModificables.scoring'] = scoring;
        }
        if (numeroPuntuaciones !== undefined) {
            updateData['datosNoModificables.numeroPuntuaciones'] = numeroPuntuaciones;
        }
        if (resenhas !== undefined) {
            updateData['datosNoModificables.resenhas'] = resenhas;
        }

        const paginaWebActualizada = await WebComercio.findByIdAndUpdate(id, updateData, { new: true });

        if (!paginaWebActualizada) {
            return res.status(404).send("Página web de comercio no encontrada");
        }

        res.send(paginaWebActualizada);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar los datos no modificables de la página web de comercio");
    }
};


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
        console.log('ID a eliminar:', id); // Verificar el ID en la consola
        const paginaWebEliminada = await WebComercio.findByIdAndDelete(id);
        if (!paginaWebEliminada) {
            return res.status(404).send("Página web de comercio no encontrada");
        }
        res.send("Página web de comercio eliminada correctamente");
    } catch(err) {
        console.error('Error al eliminar la página web de comercio:', err);
        res.status(500).send("Error al eliminar la página web de comercio");
    }
}

module.exports = { getPaginasWebComercio, crearReseña, crearPaginaWebComercio, obtenerPaginaWebComercioPorId, obtenerPaginaWebComercioPorCiudad,obtenerPaginasPorActividad ,actualizarPaginaWebComercio, eliminarPaginaWebComercio  };