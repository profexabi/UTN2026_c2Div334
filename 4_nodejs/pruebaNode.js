console.log("Hola mundo desde Node.js");

// Importo file system para leer archivos
const fs = require("fs");

fs.readFile("archivos/repaso.txt", "utf8", (err, data) => {
    // Si hay algun error lo muestro por consola y termino la funcion con return
    if (err) {
        console.log("Ocurrio un error: ", err);
        return; // Esta keyword termina con la ejecucion de este bloque de codigo (no sigue ejecutando el codigo de abajo)
    }

    // Caso de que lea y encuentre el contenido, lo muestro aca
    console.log("Contenido del archivo: ", data);
})