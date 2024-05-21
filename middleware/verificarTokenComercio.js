const jwt = require("jsonwebtoken");
const Usuario = require('../models/nosql/comercio');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Buscar el usuario con el ID del token
        const usuario = await Usuario.findById(decoded._id);
        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }

        req.user = usuario;
        next();
    } catch (err) {
        console.error(err);
        res.status(403).send("Token no válido o expirado");
    }
};

module.exports = verifyToken;