const Admin = require('../models/nosql/admin');
/**
 * Obtener lista de administradores
 * @param {*} req
 * @param {*} res
 */
const getAdmins = async (req, res) => {
    try {
        const data = await Admin.find({});
        res.send(data);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al obtener la lista de administradores");
    }
}

/**
 * Crear un nuevo administrador
 * @param {*} req
 * @param {*} res
 */
const createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.create({ email, password });
        res.status(201).send(admin);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error al crear un nuevo administrador");
    }
}

module.exports = { getAdmins, createAdmin };