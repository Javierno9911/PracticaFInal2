const Usuario = require('../models/nosql/controlUsu');
const { matchedData } = require('express-validator');

/**
 * Obtener lista de usuarios
 * @param {*} req
 * @param {*} res
 */
const getAdminRol = async (req, res) => {
    try {
        const { rol } = req.params; // Obtener el valor del parámetro 'rol'
        console.log("Rol recibido:", rol);

        // Buscar usuarios por rol usando una consulta a tu base de datos
        const usuarios = await Usuario.find({ rol: rol });

        if (usuarios.length === 0) {
            return res.status(404).send("No se encontraron usuarios con este rol");
        }

        res.send(usuarios);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al obtener usuarios por rol");
    }
}

/**
 * Obtener lista de usuarios
 * @param {*} req
 * @param {*} res
 */
const getMiembro = async (req, res) => {
    try {
        const user = req.user 
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
const crearMiembro = async (req, res) => {
    try {
        const usuarioData = req.body;

        // Verificar que el campo 'rol' sea válido ('miembro' o 'admin')
        const rolesValidos = ['miembro', 'admin'];
        if (!rolesValidos.includes(usuarioData.rol)) {
            return res.status(400).send("El campo 'rol' debe ser 'miembro' o 'admin'");
        }

        // Crear el usuario si el campo 'rol' es válido
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
const obtenerMiembroID = async (req, res) => {
    try {
        const { id } = matchedData(req);
        console.log("ID recibido:", id);
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
 * Obtener usuarios por ciudad
 * @param {*} req
 * @param {*} res
 */
const obtenerMiembroCiudad = async (req, res) => {
    try {
        const { ciudad } = req.params; // Obtener el parámetro de la ciudad desde la URL
        console.log("Ciudad recibida:", ciudad);

        // Buscar usuarios por ciudad usando una consulta a tu base de datos
        const usuarios = await Usuario.find({ ciudad: ciudad });

        if (usuarios.length === 0) {
            return res.status(404).send("No se encontraron usuarios en esta ciudad");
        }

        res.send(usuarios);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al obtener usuarios por ciudad");
    }
}

/**
 * Obtener usuarios por ciudad
 * @param {*} req
 * @param {*} res
 */
const obtenerMiembroPorIntereses = async (req, res) => {
    try {
        const { interes } = req.params; // Obtener el parámetro de interés desde la URL
        console.log("Interés recibido:", interes);

        // Buscar usuarios cuyo array de intereses incluya el valor especificado
        const usuarios = await Usuario.find({ intereses: interes });

        if (usuarios.length === 0) {
            return res.status(404).send(`No se encontraron usuarios con el interés '${interes}'`);
        }

        res.send(usuarios);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al obtener usuarios por intereses");
    }
}

/**
 * Actualizar un usuario por su ID
 * @param {*} req
 * @param {*} res
 */
const actualizarMiembro = async (req, res) => {
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

/**
 * Eliminar un usuario por su ID
 * @param {*} req
 * @param {*} res
 */
const eliminarMiembro = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del parámetro de la ruta
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        if (!usuarioEliminado) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.send("Usuario eliminado correctamente");
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al eliminar el usuario");
    }
}


module.exports = { getAdminRol, getMiembro, crearMiembro, obtenerMiembroID, obtenerMiembroPorIntereses ,obtenerMiembroCiudad, actualizarMiembro, eliminarMiembro };