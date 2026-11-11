/*============================
    Controladores producto
============================*/

import connection from "../database/db.js";
import ProductModels from "../models/product.models.js";


/////////////////////////////
// Obtener todos los productos
export const getAllProducts = async (req, res) => {

    // Optimizacion 1: Manejo de errores con try ...catch
    try {
        
        // El controlador llama al modelo
        const [rows] = await ProductModels.selectAllProducts();

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
}


/////////////////////////////
// Obtener producto por id
export const getProductById = async (req, res) => {
    // Optimizacion 2: Filtro ids no validos en el middleware validateId

    // Optimizacion 1: Manejo de errores con try ...catch
    try {

        const [rows] = await ProductModels.selectProductById(req.id);

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
}



/////////////////////////////
// Crear producto
export const createProduct = async (req, res) => {

    // Optimizacion 1: Manejo de errores con try ...catch
    try {
        // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS

        // Aca ya directamente recibimos un objeto
        const { category, image, name, price } = req.body; // Extraemos los valores parseados del cuerpo de la peticion HTTP

        const [result] = await ProductModels.insertNewProduct(name, image, category, price);

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
}



/////////////////////////////
// Modificar producto
export const modifyProduct = async (req, res) => {

    // Optimizacion 1: Manejo de errores con try ...catch
    try {

        // TO DO, incorporar modificacion de status
        // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS
        const { id, name, image, price, category, active } = req.body;

        const [result] = await ProductModels.updateProduct(name, image, price, category, active, id);

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
}



/////////////////////////////
// Eliminar producto
export const removeProduct = async (req, res) => {
    // Optimizacion 2: Filtro ids no validos en el middleware validateId

    // Optimizacion 1: Manejo de errores con try ...catch
    try {

        await ProductModels.deleteProduct(req.id);
    
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
}