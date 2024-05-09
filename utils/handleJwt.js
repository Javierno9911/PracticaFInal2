const jwt = require("jsonwebtoken")

/**
 * Generar token JWT para un usuario
 * @param {*} user Objeto de usuario
 * @returns Token JWT generado
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign
}

/**
 * Verificar y decodificar un token JWT
 * @param {*} tokenJwt Token JWT a verificar
 * @returns Datos decodificados del token o null si hay un error
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, process.env.JWT_SECRET)
    }catch(err) {
        console.log(err)
    }
}

module.exports = { tokenSign, verifyToken }