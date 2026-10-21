# [Express.js](https://www.npmjs.com/package/express)

## Como evitar enviar archivos o carpetas a Git?
Creamos un archivo `.gitignore`
Dentro escribimos, linea por linea archivos y carpetas que no querramos que se pusheen a git
    - node_modules
    - .env (archivo de contraseñas e info sensible)

`.gitignore`
```
node_modules
.env
```

Cuando clonemos un proyecto, no vamos a disponer de los modulos para que el proyecto funcione. No tendremos la carpeta de node_modules con todo lo necesario para que, en este caso, funcione `Express` y `nodemon`

Como lo solucionamos?
```sh
npm i # o npm install
```
Instalamos todas las dependencias listadas en el `package.json` de nuestro proyecto!

Con este comando, se va directo al package a leer las dependencias y versiones de esas dependencias que necesitamos para que el proyecto funcione

---

## Que es `Express.js`?
Express.js es una libreria que funciona sobre Node.js. 
Creado a partir del modulo http y diseñado para facilitar la creacion de servidores web.

Simplifica el manejo de rutas, peticiones HTTP, respuestas y otras tareas comunes en el desarrollo backend

Es basicamente un framework minimalista que nos permite crear servidores de forma mas rapida y con menos lineas de codigo que utilizando el modulo http nativo de Node.js

## Ventajas de Express.js
- Es ligero y flexible
- Permite manejar rutas facilmente
- Simplifica el manejo de middlewares (funciones que se ejecutan entre la req y la res)
- Cuenta con un gran ecosistema de modulos y herramientas


## 1 / Comenzando un proyecto `Node.js` con NPM
Para comenzar a usar Express.js, primero tenemos que instalarlo en nuestro proyecto. Y esto supone, inicializar nuestro nuevo proyecto Node.js con npm (Node Package Manager)

**Creamos un proyecto Node.js**
```sh
npm init -y
```
Este comando genera un archivo `package.json` con la configuracion inicial de nuestro proyecto de Node.js

### Que es `package.json`?
El archivo `package.json` es un componente fundamental en cualquier proyecto Node.js.

Es un archivo que contiene informacion crucial sobre el proyecto, incluyendo dependencias, scripts, metadatos, etc

- **name**: Define el nombre del proyecto y debe ser unico si queremos publicarlo en npm

- **version**: Especifica la version del proyecto siguiendo el estandar SemVer, normalmente en formato XYZ
    - x: cambia cuando hay modificaciones incompatibles (version mayor)
    - y: cambia cuando hay nuevas caracteristicas pero compatibles (version menor)
    - z: Cambia cuando se corrigen errores o se hacen pequeños ajustes (patches)

- **description**: Proporciona una breve descripcion sobre le proposito o funcionalidad del proyecto

- **main**: Indica el archivo principal de la aplicacion, es decir, el punto de entrada de nuestro proyecto. En este archivo normalmente se encuentra el codigo que inicializa el servidor o la aplicacion

- **scripts**: Aca definimos comandos que podemos ejecutar a traves de `npm run nombreScript`. El script mas comun es dev que usamos para arrancar la aplicacion

- **keywords**: Es un array de palabras clave que ayudan a identificar el proyecto en el ecosistema npm, especialmente util si se va a publicar el proyecto

- **author**: Nombre o identificacion de autor del proyecto, podemos incluir un nombre, email o url

- **license**: Especificamos la licencia del proyecto. Dependera de como queremos que nuestro codigo sea distribuido o reutilizado

- **dependencies**: Campo que contiene todas las dependencias del proyecto, es decir, los modulos que el proyecto necesita para funcionar. Cada vez que instalamos un modulo usando `npm install` este se agrega automaticamente aca. Cada dependencia tiene un nombre y una version

- **devDependencies**: (opcional) Similar a dependencies, pero se usa para las dependencias que solo son necesarias durante el desarrollo, como herramientas de testing


## 2 / Instalando `Express.js`
```sh
npm i express
```
Con este comando instalamos Express, todos los paquetes y modulos de los que depende `Express.js` para poder funcionar van a ubicarse en la carpeta `node_modules`


## 3 / Creamos nuestro servidor `Express.js`
```js
// Importamos express
const express = require("express");

// Creamos una aplicacion de express
// En app se guardaran todas las funcionalidades que necesitamos para trabajar con express
const app = express();


// Definimos la ruta principal
app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js")
});


// Escuchamos en el puerto 3000
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
});

/* Entendiendo nuestro servidor de Express

    - Instalamos express: con npm i express
    
    - Importamos express: Traemos la libreria express al archivo
    
    - Definimos una ruta: Usamos app.get para definir que hacer cuando alguien visite la raiz "/" de nuestro servidor para devolver un saludo en texto plano
    
    - Escuchar en un puerto: Nuestro servidor express esta escuchando peticiones en el puerto 3000
*/
```

### Diferencias entre el modulo http nativo de Node.js y Express.js

- Simplicidad: Con Express.js, escribir codigo para crear rutas y manejar peticiones es mucho mas simple y requiere menos codigo. El modulo http es mas bajo nivel y puede ser tedioso para aplicaciones grandes

- Middlewares: Simplifica el manejo de middlewares, que son funciones que se ejecutan entre la peticion y la respuesta, lo que nos permite hacer validaciones, autenticar usuarios, etc

- Manejo de rutas: Con Express podemos manejar rutas facilmente, permitiendo organizar mejor las diferentes partes de neustra aplicacion. En el caso de http, tendriamos que manejar manualmente las diferentes rutas