const { handleHttpError } = require("../utils/handleHttpError");

const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        console.log("User from token:", user);  // Loguea la información del usuario
        if (!user || !user.rol) {
            handleHttpError(res, "USER_ROLE_UNDEFINED", 403);
            return;
        }

        const userRol = user.rol;
        console.log("User role:", userRol);  // Loguea el rol del usuario
        const checkValueRol = roles.includes(userRol);
        
        if (!checkValueRol) {
            handleHttpError(res, "NOT_ALLOWED", 403);
            return;
        }
        
        next();
    } catch (err) {
        handleHttpError(res, "ERROR_PERMISSIONS", 403);
    }
};

module.exports = checkRol;