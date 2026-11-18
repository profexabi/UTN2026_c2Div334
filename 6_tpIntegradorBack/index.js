/*==================
    Importaciones
==================*/
import express from "express";
import environments from "./src/api/config/environments.js"; // Traigo el puerto del .env
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { authRoutes, productRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";
import session from "express-session";



/*==================
    Config
==================*/
// Creamos una instancia de aplicacion de express, app contendra ahora todos los metodos que necesitaremos para crear un servidor
const app = express(); 
const { port, session_key } = environments;
const PORT = port;

app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src/views")); // Le indicamos donde se encuentran las vistas ejs -> src/views



/*==================
    Middlewares
==================*/
// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public"))); // Ahora decimos que los archivos estaticos estan en public

app.use(cors()); // Middleware CORS basico para permitir todas las solicitudes

app.use(express.json()); // Cuando enviamos informacion en el cuerpo del body de la request (POST y PUT) este middleware parseara el JSON recibido y lo recibiremos en el endpoint ya como un objeto

app.use(express.urlencoded({extended: true})); // Middleware para parsear los datos que recibimos con el envio nativo de un HTML <form>

app.use(loggerUrl);

// Middleware de sesion
app.use(session({
    secret: session_key,
    resave: false, // Evita guardar la sesion si no hubo cambios
    saveUninitialized: true // No guarda sesiones vacias
}));



/*==================
    Vistas
==================*/

app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// Redirijo todas las peticiones a /api/products al modulo product.routes.js
app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

// Redirijo todas las peticiones a /dashboard a viewRoutes.js (view.routes.js)
app.use("/dashboard", viewRoutes);

// Rutas de autenticacion
app.use("/", authRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});