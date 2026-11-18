/*===========================
    Rutas de autenticacion
===========================*/

import { Router } from "express";
import connection from "../database/db.js";
const router = Router();

// Vista del login
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login usuario",
        about: "Login de usuario admin"
    });
});


// Endpoint para loguear a un admin (atendera las peticiones POST a /login)
router.post("/login", async (req, res) => {
    try {

        // Extraemos los datos que vienen en el cuerpo de la peticion POST
        const { email, password } = req.body;

        // Chequeamos que vengan todos los daots
        if (!email || !password) {
            // Renderizo la vista del login.ejs pasandole un string con la clave error
            return res.render("login", {
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Todos los campos son requeridos"
            });
        }

        const sql = "SELECT * FROM users where email = ? AND password = ?";
        const [rows] = await connection.query(sql, [email, password]);

        // Chequeamos que exista ese usuario
        if (rows.length === 0) {
            return res.render("login", {
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Credenciales incorrectas"
            })
        }

        // Guardamos el usuario
        const user = rows[0];

        // Guardamos la sesion
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        // Creada la sesion, redirigimos a la vista del dashboard
        res.redirect("/dashboard/principal");


    } catch (error) {
        console.log("Error en el login: ", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});


// Endpoint para destruir session
router.post("/logout", (req, res) => {

    // 1. Destruye la sesion
    req.session.destroy((err) => {

        // Si saltara algun error 
        if (err) {
            console.log("Error al destruir la sesion: ", err);

            return res.status(500).json({
                message: "Error al cerrar la sesion"
            });
        }

        // 2. Al terminar de destruir la sesion (exitosamente), redirigimos la login
        res.redirect("/login");

    })
})



// Exportamos las rutas
export default router;