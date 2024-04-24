const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if(apiKey === 'Api-publica-123') {
             //Probar con otra para ver el error
             next()
        }else {
            res.status(403).send("api key no es correcto")
        }
    }catch(err) {
        res.status(403).send(err)
    }
}
module.exports = customHeader

/*
Este código sirve para definir un middleware de Express. Con este middleware tendremos acceso a los objetos req (solicitud) y a los objetos 
res (respuesta).

Con el if verificamos que el valor del encabezado es igual a la clave api valida.

Si entra en el else se manda un error al igual que si llega al catch.

Por ultimo se exporta la funcion para el uso en otras partes de la aplicaion.

*/