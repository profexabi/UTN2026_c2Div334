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

// Middleware de ruta para filtrar ids no validos
const validateId = (req, res, next) => {
    const id = Number(req.params.id); // Convierto a numero el valor pasado en el parametro

    // Si el numero no es un entero o es  <= 0
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El id debe ser un numero entero positivo"
        });
    }

    req.id = id;
    next(); // Damos paso al siguiente middleware o a la respuesta
}

// Middleware de ruta para validar los campos de un formulario
const validateProduct = (req, res, next) => {
    const categoriasValidas = ["food", "drink"];
    const errores = []; // Array vacio de errores

    // Recogemos los datos del body
    const { name, image, price, category } = req.body;

    // Verificamos los datos de entrada
    if (!name || !image || !price || !category) {
        errores.push("Faltan campos requeridos");
    }

    // Verificamos el campo name
    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos dos caracteres");
    }

    // Verificamos el campo precio
    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    // El campo image no lo verificamos porque despues aplicaremos Multer

    // Verificamos el campo category
    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida")
    }

    // Si existe algun error en nuestro array, devolveremos estos en un 400
    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next(); // Sin el next la peticion HTTP queda colgada porque nunca da paso al siguiente middleware o a la respuesta
}




/*==================
    Endpoints -> (URL + Verbo HTTP + Logica)
==================*/
app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// GET all products
app.get("/api/products", async (req, res) => {

    // Optimizacion 1: Manejo de errores con try ...catch
    try {
        // Extraigo SOLO los resultados de la consulta, no la info de las tablas
        const [rows] = await connection.query("SELECT * FROM products");
        // console.log(rows); Los productos llegan correctamente


        // Optimizacion 2: Devolvemos un codigo 404 si no se encuentran productos
        if (rows.length === 0) {
            // Gracias al return, termina la logica del endpoint aca (no continuamos ejecutando el codigo de abajo)
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({
            payload: rows,
            total: rows.length // Opcional, metadata util para el frontend
        });


    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si fallo la conexion a la BBDD
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});



// GET product by id
app.get("/api/products/:id", validateId, async (req, res) => {
    // Optimizacion 2: Filtro ids no validos en el middleware validateId
    
    // Optimizacion 1: Manejo de errores con try ...catch
    try {

        // Optimizacion 3: Los placeholders "?" evitan ataques de inyeccion SQL, es una manera de hacer consultas SQL mas seguras
        const sql = `SELECT * FROM products WHERE products.id = ?`
        const [rows] = await connection.query(sql, [req.id]);

        // Optimizacion 4: Devuelvo codigo 404 si no existe producto con ese id
        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontro producto con id ${req.id}`
            });
        }
    
        // console.log(rows);
        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si fallo la conexion a la BBDD
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});


// POST create new product
app.post("/api/products", validateProduct, async (req, res) => {

    // Optimizacion 1: Manejo de errores con try ...catch
    try {
        // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS
    
        // Aca ya directamente recibimos un objeto
        const { category, image, name, price } = req.body; // Extraemos los valores parseados del cuerpo de la peticion HTTP
    
        const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
    
        const [result] = await connection.query(sql, [name, image, category, price]);
   
        console.log(result);

        res.status(201).json({
            message: "Producto creado exitosamente",
            productId: result.insertId // Devolvemos el id que se le asigno al nuevo producto
        });


    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si fallo la conexion a la BBDD
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});


// PUT product
app.put("/api/products", async (req, res) => {

    // Optimizacion 1: Manejo de errores con try ...catch
    try {
    
        // TO DO, incorporar modificacion de status
        // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS
        const {id, name, image, price, category} = req.body;
    
        const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ? WHERE id = ?";
    
        await connection.query(sql, [name, image, price, category, id]);
    
        res.status(200).json({
            message: "Producto actualizado exitosamente"
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si fallo la conexion a la BBDD
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});



// DELETE product
app.delete("/api/products/:id", validateId, async (req, res) => {
    // Optimizacion 2: Filtro ids no validos en el middleware validateId

    // Optimizacion 1: Manejo de errores con try ...catch
    try {
    
        // Los placeholders -> "?" nos ayudan a evitar los ataques de inyeccion SQL. Es nuestra manera de hacer consultas SQL mas seguras
        const sql = "DELETE FROM products WHERE id = ?";
        await connection.query(sql, [req.id]);
    
        res.status(200).json({
            message: `Producto con id ${req.id} eliminado exitosamente`
        });


    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si fallo la conexion a la BBDD
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});






app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});