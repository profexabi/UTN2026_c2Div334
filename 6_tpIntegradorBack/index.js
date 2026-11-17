/*==================
    Importaciones
==================*/
import express from "express";
import environments from "./src/api/config/environments.js"; // Traigo el puerto del .env
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";



/*==================
    Config
==================*/
// Creamos una instancia de aplicacion de express, app contendra ahora todos los metodos que necesitaremos para crear un servidor
const app = express(); 
const PORT = environments.port;

app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src/views")); // Le indicamos donde se encuentran las vistas ejs -> src/views



/*==================
    Middlewares
==================*/
// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public"))); // Ahora decimos que los archivos estaticos estan en public

app.use(cors()); // Middleware CORS basico para permitir todas las solicitudes

app.use(express.json()); // Cuando enviamos informacion en el cuerpo del body de la request (POST y PUT) este middleware parseara el JSON recibido y lo recibiremos en el endpoint ya como un objeto

app.use(loggerUrl);

// Necesito contruir las rutas para apuntar a las vistas en src/views y los archivos estaticos en src/static


/*==================
    Vistas
==================*/
app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// Redirijo todas las peticiones a /api/products al modulo product.routes.js
app.use("/api/products", productRoutes);

// Redirijo todas las peticiones a /dashboard a viewRoutes.js (view.routes.js)
app.use("/dashboard", viewRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});