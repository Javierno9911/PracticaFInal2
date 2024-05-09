const Usuario = require('../models/nosql/controlUsu');
const { matchedData } = require('express-validator');
const { tokenSign } = require("../utils/handleJwt");
const {handleHttpError} = require("../utils/handleHttpError");

/**
 * Obtener rol Admin
 * @param {*} req
 * @param {*} res
 */
const getAdminRol = async (req, res) => {
    try {
        const { rol } = req.params; // Obtener el valor del parámetro 'rol'
        console.log("Rol recibido:", rol);

        // Verificar si el rol solicitado es 'admin'
        if (rol !== 'admin') {
            return res.status(400).send("El parámetro 'rol' debe ser 'admin'");
        }

        // Buscar usuarios por rol 'admin' en la base de datos
        const usuarios = await Usuario.find({ rol: rol });

        if (usuarios.length === 0) {
            return res.status(404).send("No se encontraron usuarios con el rol 'admin'");
        }

        // Generar un token JWT para los usuarios encontrados (opcional)
        const tokens = await Promise.all(usuarios.map(async (usuario) => {
            const token = await tokenSign(usuario);
            return { usuario, token };
        }));

        res.send(tokens);
    } catch(err) {
        console.error(err);
        handleHttpError(res, "ERROR_LOGIN_USER");
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
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}

/**
 * Crear un nuevo usuario REGISTER
 * @param {*} req
 * @param {*} res
 */
const crearMiembro= async (req, res) => {
    try {
        const usuarioData = req.body;

        // Verificar que el campo 'rol' sea válido ('miembro' o 'admin')
        const rolesValidos = ['miembro', 'admin'];
        if (!rolesValidos.includes(usuarioData.rol)) {
            return res.status(400).send("El campo 'rol' debe ser 'miembro' o 'admin'");
        }

        // Crear el usuario si el campo 'rol' es válido
        const usuario = await Usuario.create(usuarioData);

        // Generar un token JWT para el usuario recién creado
        const token = await tokenSign(usuario);

        // Devolver el token junto con los datos del usuario en la respuesta
        res.status(201).send({ usuario, token });
    } catch(err) {
        console.error(err);
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}
/**
 * Obtener un usuario por su ID LOGIN
 * @param {*} req
 * @param {*} res
 */
const obtenerMiembroID = async (req, res) => {
    try {
        const { id } = matchedData(req);
        console.log("ID recibido:", id);
        
        // Buscar usuario por ID en la base de datos
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }

        // Generar un token JWT para el usuario encontrado
        const token = await tokenSign(usuario);

        // Remover el campo de contraseña del usuario (si es necesario)
        usuario.password = undefined; // Opcional: Eliminar el campo de contraseña del usuario antes de enviarlo

        // Enviar respuesta con el usuario y el token JWT
        res.send({ usuario, token });
    } catch(err) {
        console.error(err);
        handleHttpError(res, "ERROR_OBTENER_USER");
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
        handleHttpError(res, "ERROR_OBTENER_USER");
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
        handleHttpError(res, "ERROR_OBTENER_USER");
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
        handleHttpError(res, "ERROR_ACTUALIZAR_USER");
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
        handleHttpError(res, "ERROR_DELETE_USER");
    }
}


module.exports = { getAdminRol, getMiembro, crearMiembro, obtenerMiembroID, obtenerMiembroPorIntereses ,obtenerMiembroCiudad, actualizarMiembro, eliminarMiembro };