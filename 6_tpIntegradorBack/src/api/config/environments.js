// Importamos el modulo dotenv para poder cargar las variables de entorno del .env
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

export default {
    port: process.env.PORT || 3001,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}