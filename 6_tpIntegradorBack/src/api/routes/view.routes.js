/*======================
    Rutas vistas
======================*/
import { Router } from "express";
import { vistaConsultar, vistaCrear, vistaCrearUser, vistaEliminar, vistaModificar, vistaPrincipal } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router();


// Vista principal
router.get("/principal", requireLogin, vistaPrincipal);


// Vista consultar
router.get("/consultar", requireLogin, vistaConsultar);


// Vista crear producto
router.get("/crear", requireLogin, vistaCrear)


// Vista crear usuario
router.get("/crearUser", requireLogin, vistaCrearUser);


// Vista modificar
router.get("/modificar", requireLogin, vistaModificar)


// Vista eliminar
router.get("/eliminar", requireLogin, vistaEliminar);


// Exportamos las rutas de las vistas (todo de una)
export default router;