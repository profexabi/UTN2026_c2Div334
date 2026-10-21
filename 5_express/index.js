// Importamos express
const express = require("express");

// Creamos una aplicacion de express
// En app se guardaran todas las funcionalidades que necesitamos para trabajar con express
const app = express();


// Definimos la ruta principal, la ruta raiz /
app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js")
});

// Ruta sobre nosotros
app.get("/sobre", (req, res) => {
    res.send("Esta es la pagina de info sobre nosotros")
});


// Ruta contacto
app.get("/contacto", (req, res) => {
    res.send("Contactanos en capo@maquina.com.ar")
});

// Ruta para proporcionar info en JSON
// Endpoint para obtener todos los usuarios
app.get("/api/usuarios", (req, res) => {

    // Aca mas adelante haremos una conexion con la BBDD, pediremos los usuarios con una query
    // SELECT * FROM users

    // La respuesta la incluiremos adentro de res.json()
    res.json({
        nombre: "Ernesto",
        edad: 41
    })
});

/* Endpoint para crear usuarios

app.post("/api/usuarios", async (req, res) => {
    
    try {
        // Recibimos los datos del formulario HTML que nos manda la vista a traves de la API fetch
        // Lo recibo en el cuerpo de la peticion HTTP req.body

        // Le enviamos a la BBDD estos datos que vienen del formularios
        const [users] = await mysql2.query("INSERT INTO usuarios ...")

        // Le devolvemos un mensaje de exito al usuario
    
    } catch (error) {
        console.log(error) 
    }

})

*/




// Escuchamos en el puerto 3000
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el http://localhost:${puerto}`);
});

/* Entendiendo nuestro servidor de Express

    - Instalamos express: con npm i express
    
    - Importamos express: Traemos la libreria express al archivo
    
    - Definimos una ruta: Usamos app.get para definir que hacer cuando alguien visite la raiz "/" de nuestro servidor para devolver un saludo en texto plano
    
    - Escuchar en un puerto: Nuestro servidor express esta escuchando peticiones en el puerto 3000
*/
