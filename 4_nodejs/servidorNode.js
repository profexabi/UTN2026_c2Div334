/*=========================
    http
=========================

Este modulo es crucial para trabajar con servidores y manejar peticiones HTTP. 
Es la base para cualquier aplicacion web en Node.js

HTTP nos permite crear un servidor web sin necesidad de instalar nada adicional
Vamos a crear un servidor basico que responda con un mensaje en texto plano diciendo "Hola mundo desde Node.js" cuando alguien visite nuestra pagina
*/

// Importamos el modulo HTTP
const http = require("http"); // Ahora http contiene todos los metodos del modulo para poder crear un servidor

// Creamos el servidor
const servidor = http.createServer((req, res) => {

    // Configuramos la respuesta
    res.statusCode = 200; // Indicamos que la peticion fue exitosa

    // Indicaremos en el encabezado de la respuesta HTTP que vamos a devolver texto plano
    res.setHeader("Content-Type", "text/plain"); // Indicamos que responderemos con texto plano

    res.end("Hola mundo desde Node.js"); // Mensaje que le enviamos al cliente
});


// Definimos el puerto y arrancamos el servidor
const puerto = 3000; // por convencion elegimos el puerto 3000
servidor.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});

// Detengo la ejecucion de mi servidor con Ctrl + c