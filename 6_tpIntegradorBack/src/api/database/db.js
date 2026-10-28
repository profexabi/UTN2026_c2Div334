// Importamos el modulo mysql2 en modo promesas, para poder hacer peticiones asincronas a la BBDD
import mysql2 from "mysql2/promise";

// Importamos la informacion de la conexion a la BBDD
import environments from "../config/environments.js";

// Estraemos (con destruturing) la info de la conexion a la BBDD
const { database } = environments;

// Creamos la conexion (un pool de conexiones) a a la BBDD
const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

// Exportamos el pool de conexinoes para poder ser usado en otros modulos
export default connection; 

/*
- mysql2 es el modulo

- createPool es una funcion que crea un grupo (pool) de conexiones a la BBDD

    - Crea un gestor de conexiones automatico
    - Se conecta a la BBDD usando los parametros host, database, user y pass
    - Por defecto abre hasta 10 conexiones simultaneas (configurable)
    - Como usamos mysql2/promises podemos usar await connection.query() para ejecutar sentencias sql
    - Le pasamos la configuracion desde el objeto database

- Este objeto connection es el que usaremos en otras partes de la aplicacion para hacer consultas a la BBDD
*/