const mongoose = require('mongoose')
const dbConnect = () => {
    const db_uri = process.env.DB_URI
    mongoose.set('strictQuery', false)
    try{
        mongoose.connect(db_uri)
    }catch(error){
        console.err("Error conectando a la BD:", error)
    }
    //Listen events
    mongoose.connection.on("connected",() => console.log("Conectado a la BD"))
}
module.exports = dbConnect

/*En config importamos las bibliotecas de mongose, Mongoose es una biblioteca de modelado de objetos de MongoDb que sera la base de datos que 
usaremos en este proyecto.

Y definimos la llamada a la base de datos con dbConnect. Si se conecta correctamente saldra el mensaje de Conectado y si no saltara al catch
donde nos saltara error en la consola.

*/