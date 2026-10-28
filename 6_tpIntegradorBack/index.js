/*==================
    Importaciones
==================*/
import express from "express";
import environments from "./src/api/config/environments.js"; // Traigo el puerto del .env
import connection from "./src/api/database/db.js";

// Creamos una instancia de aplicacion de express, app contendra ahora todos los metodos que necesitaremos para crear un servidor
const app = express(); 
const PORT = environments.port;


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

// TO DO
// app.post("/api/product") -> donde recibira el contenido de un formulario html

// app.put("/api/products/:id")

// app.delete("/api/product/:id")



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});