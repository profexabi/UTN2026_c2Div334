/*======================
    Rutas producto
======================*/

import { Router } from "express"; // Router funciona como una "mini aplicacion de express"
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import connection from "../database/db.js"

const router = Router(); // Hacemos lo mismo que con const app = express();


// GET all products
router.get("/", async (req, res) => {

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
router.get("/:id", validateId, async (req, res) => {
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
router.post("/", validateProduct, async (req, res) => {

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
router.put("/", validateProduct, async (req, res) => {

    // Optimizacion 1: Manejo de errores con try ...catch
    try {
    
        // TO DO, incorporar modificacion de status
        // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS
        const {id, name, image, price, category, active} = req.body;
    
        const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ?, active = ? WHERE id = ?";
    
        const [result] = await connection.query(sql, [name, image, price, category, active, id]);

        console.log(result);

        // Optimizacion 2: Verificamos si realmente se actualizo algo respecto de la informacion previa del producto
        if (result.changedRows === 0) {
            return res.status(404).json({
                message: "No se actualizo el producto"
            })
        }
    
        res.status(200).json({
            message: "Producto actualizado exitosamente"
        });


    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si fallo la conexion a la BBDD
        res.status(500).json({
            message: "Error interno al modificar productos"
        });
    }
});



// DELETE product
router.delete("/:id", validateId, async (req, res) => {
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


// Exportamos todas estas rutas de producto
export default router;