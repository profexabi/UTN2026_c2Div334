/*==================
    Importaciones
==================*/
import express from "express";
import environments from "./src/api/config/environments.js"; // Traigo el puerto del .env
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

// Creamos una instancia de aplicacion de express, app contendra ahora todos los metodos que necesitaremos para crear un servidor
const app = express(); 
const PORT = environments.port;



/*==================
    Middlewares
==================*/
app.use(cors()); // Middleware CORS basico para permitir todas las solicitudes

app.use(express.json()); // Cuando enviamos informacion en el cuerpo del body de la request (POST y PUT) este middleware parseara el JSON recibido y lo recibiremos en el endpoint ya como un objeto

app.use(loggerUrl);


/*==================
    Endpoints -> (URL + Verbo HTTP + Logica)
==================*/
app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// Redirijo todas las peticiones a /api/products al modulo product.routes.js
app.use("/api/products", productRoutes);


// app.get("/dashboard", viewRoutes)

// Opcion 2 sin modularizar las rutas
// app.get("/dashboard/principal", vistaPrincipal)
// app.get("/dashboard/consultar", consuiltar)
// app.get("/dashboard/crear", vistaCrear)
// app.get("/dashboard/modificar", vistaModificar)
// app.get("/dashboard/eliminar", vistaEliminar)



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});