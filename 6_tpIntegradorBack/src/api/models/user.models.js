/*============================
    Modelos de usuario
============================*/

import connection from "../database/db.js";

// Crear usuario
export const insertNewUser = (name, email, password) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    return connection.query(sql, [name, email, password]);
}