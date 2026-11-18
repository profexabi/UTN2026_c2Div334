/*============================
    Controladores usuario
============================*/

import { insertNewUser } from "../models/user.models.js"


export const createNewUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const [result] = await insertNewUser(name, email, password);
        //const [result] = await UserModels.insertNewUser(name, email, password);

        console.log(result);

        res.render("createUser", {
            title: "Crear usuario",
            about: "Crear usuario admin",
            message: "Usuario creado exitosamente"
        });

    } catch(error) {
        console.log("Error creando usuario: ", error);

        res.status(500).json({
            message: "Error interno al crear usuario"
        });
    }
}