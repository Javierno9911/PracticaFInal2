const express = require("express")
const cors = require("cors")
require('dotenv').config();
const dbConnect = require('./config/mongo')
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")
const loggerStream = require("./utils/handleLogger")
const morganBody = require("morgan-body")

const app = express();

morganBody(app, {
    noColors: true,
    skip: function(req, res) {
    return res.statusCode < 400
    },
    stream: loggerStream
})

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors())
app.use(express.json())

//console.log("Especificaciones de Swagger:", swaggerSpecs);

// Configuración de Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api", require("./routers"))

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})

dbConnect()

module.exports = app
