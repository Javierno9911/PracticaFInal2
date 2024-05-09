const { handleHttpError } = require("../utils/handleHttpError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models/nosql/controlUsu");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return handleHttpError(res, "NOT_TOKEN", 401);
        }

        const token = req.headers.authorization.split(' ').pop(); 
        const dataToken = await verifyToken(token);

        if (!dataToken || !dataToken._id) {
            return handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
        }

        const query = {
            [propertiesKey.id]: dataToken._id
        };

        const user = await usersModel.findOne(query);

        if (!user) {
            return handleHttpError(res, "USER_NOT_FOUND", 404);
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error en middleware de autenticación:", error.message);
        handleHttpError(res, "NOT_SESSION", 401);
    }
};

module.exports = authMiddleware;