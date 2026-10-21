// Importaciones
import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hola mundo desde proyecto integrador back");
});

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`)
});