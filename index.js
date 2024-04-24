const express = require("express")
const cors = require("cors")
require('dotenv').config();
const dbConnect = require('./config/mongo')

const app = express()

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors())
app.use(express.json())

app.use("/api", require("./routers"))

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})

dbConnect()

//212.0.109.168

/*
Primero se configura una aplicación Express y el middleware CORS para permitir solicitudes de recursos desde un origen diferente al del servidor.

Despues se crea una instancia de la aplicaion Express. Esto se realiza en la linea 6.

Se utiliza app.use() para montar el enrutador principal en la ruta /api. El enrutador principal se importa desde el archivo routers.js.

Y finalmente se inicia el servidor obteniendo el puerto que en este caso es el 3000 y con el metodo listen se manda un mensaje por la consola mostrando
que todo esta bien.

*/