const jwt = require("jsonwebtoken");
const Publicacion = require('../models/nosql/publicaciones'); // Importa el modelo de publicaciones

const verificarIdComercio = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Buscar la publicación que se quiere actualizar
        const publicacion = await Publicacion.findById(req.params.id);
        if (!publicacion) {
            return res.status(404).send("Publicación no encontrada");
        }

        // Comparar el comercioId de la publicación con el _id del token
        if (publicacion.comercioId.toString() !== decoded._id) {
            return res.status(403).send("No tienes permiso para actualizar esta publicación");
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(403).send("Token no válido o expirado");
    }
};

module.exports = verificarIdComercio;