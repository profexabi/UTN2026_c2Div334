/*==================
    Importaciones
==================*/
import express from "express";
import environments from "./src/api/config/environments.js"; // Traigo el puerto del .env
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";
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
    Endpoints -> (URL + Verbo HTTP + Logica)
==================*/
app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// Redirijo todas las peticiones a /api/products al modulo product.routes.js
app.use("/api/products", productRoutes);

// Vista principal
app.get("/dashboard/principal", (req, res) => {
    // Nuestra aplicacion renderiza la vista en src/views/index.ejs
    res.render("index");
});

// Vista consultar
app.get("/dashboard/consultar", (req, res) => {
    res.render("get");
});

// Vista crear
app.get("/dashboard/crear", (req, res) => {
    res.render("post");
})

// Vista consultar
app.get("/dashboard/modificar", (req, res) => {
    res.render("put");
})

// Vista consultar
app.get("/dashboard/eliminar", (req, res) => {
    res.render("delete");
});

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