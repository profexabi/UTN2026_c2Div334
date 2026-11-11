/*============================
    Modelos de producto
============================*/

import connection from "../database/db.js";

/////////////////////////////
// Obtener todos los productos
const selectAllProducts = () => {
    // Extraigo SOLO los resultados de la consulta, no la info de las tablas
    return connection.query("SELECT * FROM products");
}


/////////////////////////////
// Obtener producto por id
const selectProductById = (id) => {
    // Optimizacion 3: Los placeholders "?" evitan ataques de inyeccion SQL, es una manera de hacer consultas SQL mas seguras
    const sql = `SELECT * FROM products WHERE products.id = ?`
    return connection.query(sql, [id]);
}


/////////////////////////////
// Crear producto
const insertNewProduct = (name, image, category, price) => {

    const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";

    return connection.query(sql, [name, image, category, price]);
}


/////////////////////////////
// Modificar producto
const updateProduct = (name, image, price, category, active, id) => {
    
    const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ?, active = ? WHERE id = ?";

    return connection.query(sql, [name, image, price, category, active, id]);
}


/////////////////////////////
// Eliminar producto
const deleteProduct = (id) => {

    // Los placeholders -> "?" nos ayudan a evitar los ataques de inyeccion SQL. Es nuestra manera de hacer consultas SQL mas seguras
    const sql = "DELETE FROM products WHERE id = ?";
    return connection.query(sql, [id]);
}

export default {
    selectAllProducts,
    selectProductById,
    insertNewProduct,
    updateProduct,
    deleteProduct
}