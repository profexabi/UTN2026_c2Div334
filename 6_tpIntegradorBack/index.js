/*==================
    Importaciones
==================*/
import express from "express";
import environments from "./src/api/config/environments.js"; // Traigo el puerto del .env
import connection from "./src/api/database/db.js";
import cors from "cors";

// Creamos una instancia de aplicacion de express, app contendra ahora todos los metodos que necesitaremos para crear un servidor
const app = express(); 
const PORT = environments.port;



/*==================
    Middlewares
==================*/
app.use(cors()); // Middleware CORS basico para permitir todas las solicitudes

app.use(express.json()); // Cuando enviamos informacion en el cuerpo del body de la request (POST y PUT) este middleware parseara el JSON recibido y lo recibiremos en el endpoint ya como un objeto

// Middleware logger para analizar por consola todas las solicitudes
app.use((req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next(); // Damos paso al siguiente middleware o a procesar la response
});



/*==================
    Endpoints -> (URL + Verbo HTTP + Logica)
==================*/
app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// GET all products
app.get("/api/products", async (req, res) => {
    // Extraigo SOLO los resultados de la consulta, no la info de las tablas
    const [rows] = await connection.query("SELECT * FROM products");
    // console.log(rows); Los productos llegan correctamente

    res.status(200).json({
        payload: rows
    })
});


// GET product by id
app.get("/api/products/:id", async (req, res) => {

    // Gracias al objeto req, extraigo el valor numero de la url
    const id = req.params.id;

    const [rows] = await connection.query(`SELECT * FROM products WHERE products.id = ${id}`);

    // console.log(rows);
    res.status(200).json({
        payload: rows
    })
});


// POST create new product
app.post("/api/products", async (req, res) => {
    // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS

    // Aca ya directamente recibimos un objeto
    const {category, image, name, price} = req.body; // Extraemos los valores parseados del cuerpo de la peticion HTTP

    const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";

    await connection.query(sql, [name, image, category, price]);

    res.status(201).json({
        message: "Producto creado exitosamente"
    });
});


// PUT product
app.put("/api/products", async (req, res) => {

    // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS
    const {id, name, image, price, category} = req.body;

    const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ? WHERE id = ?";

    await connection.query(sql, [name, image, price, category, id]);

    res.status(200).json({
        message: "Producto actualizado exitosamente"
    });
})



// DELETE product
app.delete("/api/products/:id", async (req, res) => {
    const id = req.params.id;

    // Los placeholders -> "?" nos ayudan a evitar los ataques de inyeccion SQL. Es nuestra manera de hacer consultas SQL mas seguras
    const sql = "DELETE FROM products WHERE id = ?";
    await connection.query(sql, [id]);

    res.status(200).json({
        message: `Producto con id ${id} eliminado exitosamente`
    });
});






app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});