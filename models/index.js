const models = {
    //usersModel: require('./nosql/comercio')
    comercioModel: require('./nosql/comercio'),
    controlModel: require('./nosql/controlUsu'),
    webComercioModel: require('./nosql/publicaciones')
}
module.exports = models

/*
Aqui se exporta el modelo comercio anteriormente creado.

*/