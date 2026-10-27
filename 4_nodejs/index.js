// Podemos ejecutar este archivo de JavaScript con la instruccion 
// node nombreArchivo.js 
console.log("Hola mundo desde Node.js");


/*=========================
    Modulos en Node.js
===========================

Los modulos son bloques de codigo que nos permiten organizar y reutilizar codigo de forma eficiente para no tener toda la logica en un solo archivo enorme, podemos dividirlo en distintos archivos o modulos y luego importarlos donde los necesitemos

Esto hace que nuestro codigo sea mas facil de mantener, mas limpio y mas facil de escalar

Node.js tiene varios modulos integrados que vienen listos para usar, esto quiere decir que ya vienen preinstalados y por tanto no tendremos que instalarlos con npm

Para poder usar las funcionalidades que nos ofrece un modulo, tenemos que:
    1. Instalarlo -> npm i nombreModulo
    2. Importarlo -> const express = require("express")
    3. (opcional) Inicializarlo -> const app = express();


=========================
    fs (File System)
=========================

Este modulo nos permite interactuar con el sistema de archivos
Podemos leer, escribir, actualizar y borrar archivos de forma sencilla

La lectura de archivos es una operacion asincrona!
*/

// Es el equivalente a hacer en el navegador const console = require("console"); o import console from "browser";
// Importamos el modulo file system para poder interactuar con el sistema de archivos
const fs = require("fs"); // Ahora la variable fs contendra todos los metodos del modulo file system

// Vamos a leer un archivo de texto -> ubicado en archivos/leeme.txt
fs.readFile("archivos/leeme.txt", "utf8", (err, data) => { // OPERACION ASINCRONICA!
    if (err) {
        console.log("Ocurrio un error: ", err);
        return; // Esta keyword termina con la ejecucion de este bloque de codigo (no sigue ejecutando el codigo de abajo)
    }

    console.log("Contenido del archivo: ", data);

    /*  Contenido del archivo:  Holis! Soy un humilde archivo de texto

        Nos vemos!
    */
});

/* Caso de error:
Ocurrio un error:  [Error: ENOENT: no such file or directory, open 'archivos/leeame.txt'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'archivos/leeame.txt'
}
*/

/*=========================
    path
=========================

El modulo path nos ayuda a manejar y manipular rutas de archivos y directorios de forma mas segura y comoda
*/

// Para obtener el nombre de archivo de una ruta completa
const path = require("path");

const rutaArchivo = "Escritorio/Docencia/2026/Cuatri\ 2/UTN2026_c2Div334/4_nodejs/archivos/leeme.txt";

// El metodo path.basename nos permitira obtener solamente el nombre del archivo de la ruta completa
const nombreArchivo = path.basename(rutaArchivo);

console.log("El nombre del archivo es: ", nombreArchivo);
console.log("test");



/*=========================
    os
=========================

El modulo os (Operative System) nos permite obtener informacion del sistema operativo en el que estamos ejecutando Node.js.

Podemos obtener la cantidad de memoria libre disponible o el tipo de Sistema Operativo
*/

const os = require("os");

const memoriaLibre = os.freemem();
const tipoSistema = os.type();

console.log(`Memoria libre: `, memoriaLibre);
console.log(`Tipo de sistema operativo: `, tipoSistema);


/*========================
    Modulos en Node.js
==========================

Cada vez que usamos require() estamos "importando" un modulo para que podamos utilizar sus funciones en nuestro archivo actual

Por supuesto podemos crear nuestros propios modulos

Los modulos nos permiten organizar mejor nuestro codigo, evitando que todo este en un solo archivo y permitiendo que podamos reutilizar funciones o clases en diferentes partes de nuestro proyecto
*/

// Vamos a utilizar la funcion saludar que exportamos en saludos.js
const saludar = require("./saludos");

console.log(saludar(`Federico`)); // Hola, Federico! -> Estamos reutilizando codigo y funciones de otros archivos de nuestro proyecto