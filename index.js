const express = require("express")
const cors = require("cors")
require('dotenv').config();
const dbConnect = require('./config/mongo')
const loggerStream = require("./utils/handleLogger")

const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")

const morganBody = require("morgan-body")
const {IncomingWebhook} = require("@slack/webhook")

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)
const loggerStream = {
    write: message => {
        webHook.send({text: message})
    },
}

morganBody(app, {
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function(req, res) { 
        return res.statusCode < 400
    },
    stream: loggerStream
})


const app = express()

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors())
app.use(express.json())

app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
)

app.use("/api", require("./routers"))

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})

dbConnect()

module.exports = app

//212.0.109.168