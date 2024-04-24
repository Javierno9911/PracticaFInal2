const models = {
    //usersModel: require('./nosql/comercio')
    comercioModel: require('./nosql/comercio'),
    usuarioModel: require('./nosql/usuarios'),
    webComercioModel: require('./nosql/publicaciones'),
    adminModel: require('./nosql/admin')
}
module.exports = models

/*
Aqui se exporta el modelo comercio anteriormente creado.

*/