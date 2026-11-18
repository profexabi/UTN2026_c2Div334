/*======================
    Rutas usuario
======================*/
import { Router } from "express";
import { createNewUser } from "../controllers/user.controllers.js";
const router = Router();

///////////////////
// Create new user
router.post("/", createNewUser);

export default router;