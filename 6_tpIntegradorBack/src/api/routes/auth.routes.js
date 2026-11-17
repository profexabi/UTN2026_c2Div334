/*===========================
    Rutas de autenticacion
===========================*/

import { Router } from "express";
const router = Router();

// Vista del login
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login usuario",
        about: "Login de usuario admin"
    });
});


// Endpoint que atendera las peticiones POST a /login
router.post("/login", (req, res) => {
    try {

        // Extraemos los datos que vienen en el cuerpo de la peticion POST
        const { email, password } = req.body;

        // Chequeamos que vengan todos los daots
        if (!email || !password) {
            // Renderizo la vista del login.ejs pasandole un string con la clave error
            return res.render("login", {
                title: "Login usuario",
                about: "Login de usuario admin",
                error: "Faltan email o password!"
            });
        }

    } catch (error) {
        console.log("Error en el login: ", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
})


// Exportamos las rutas
export default router;