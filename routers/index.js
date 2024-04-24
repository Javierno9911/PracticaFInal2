const express = require("express")
const fs = require("fs")
const router = express.Router()

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}
fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file) 
    if(name !== 'index') {
        router.use('/' + name, require('./'+name)) 
    }
})
module.exports = router

/*
Se importa la biblioteca Express y el módulo fs de Node.js. Definimos un nuevo enrutador usando express.Router(). Este enrutador se utilizará para 
definir las rutas en función de los archivos encontrados en el directorio.

Se define una fincion para quitar la extension, recogiendo el nombre del archivo y devolviendolo sin extension.

Si no es un index, se recoge y se exporta para usarlo mas adelante.

*/ 