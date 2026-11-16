// Logica para trabajar con archivos y rutas del proyecto -> Esta funcionalidad sirve para versiones posteriores a Node 22
// Necesitamos crear a mano una variable que apunte a la carpeta raiz del servidor para desde ahi, apuntar a src/views (vistas) y src/public (archivos estaticos) -> Tenemos que construir las rutas a esas carpetas que nos proporcionaran las vistas y los archivos estaticos

import { join } from "path"; // join nos permite unir segmentos de rutas

// Construimos a mano __dirname que apunta a la raiz del servidor (ESM no incluye __dirname, commonjs si)
// import.meta.dirname apunta a este directorio concreto, src/api/utils
const __dirname = join(import.meta.dirname, "../../../"); // Ya cree la variable que apunta a la raiz del servidor

export {
    __dirname,
    join
}