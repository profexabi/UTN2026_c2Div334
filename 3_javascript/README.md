# JavaScript

### Prox clase
#### [Columna de Emi Garzon sobre tecnologia](https://www.youtube.com/watch?v=Z3kXgVFaTVM)

---

### *Como ejecuta las instrucciones JavaScript internamente?*
**JavaScript internamente “lee” el código antes de ejecutarlo**, realizando un proceso en dos fases:

**1. Fase de compilación** (o creación del contexto)
Antes de ejecutar línea por línea, el motor de JavaScript analiza todo el código. En esta etapa:

- Registra variables y funciones.
- Determina el alcance (scope).
- Prepara el entorno de ejecución.


**2. Fase de ejecución**
Recién después ejecuta el código en orden.


---

## JavaScript VII / Callbacks, High Order Functions, Destructuring, Spread Operator, funciones anidadas y web apis




---


## JavaScript VI / Manipulacion del DOM en JavaScript y Eventos

### Que es el [DOM](https://www.w3schools.com/whatis/whatis_htmldom.asp)?
El DOM HTML o Modelo de Objetos del Documento (Document Object Model) es una interfaz de programacion que representa un documento HTML como una estructura jerarquica de objetos, conocida comunmente como arbol DOM. Esta estructura permite a los programas acceder, modificar, añadir o eliminar elementos, contenido, estilos y atributos del documento de forma dinamica.

Cada elemento HTML se convierte en un nodo dentro de este arbol y todos los elementos estan relacionados entre si mediante padres, hijos y hermanos, creando una representacion en memoria del documento que el navegador puede manipular.

DOM es la base que permite a JavaScript interactuar con el contenido de una pagaina web, transformando el codigo HTML en una estructura de objetos manipulable.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Mi página</title>
    </head>
    <body>
        <h1>Bienvenidos</h1>
        <p>Este es un párrafo</p>
    </body>
</html>
```

Este HTML seria representado en el DOM como una estructura en forma de arbol. Siendo `document` el objeto que representa toda la pagina web
- document
    - html
        - head
            - title
        - body
            - h1
            - p

JavaScript puede acceder y modificar cualquier elemento del DOM utilizando el objeto global `document`, con el puede:
    - Modificar el contenido (texto, atributos, clases)
    - Añadir o eliminar elementos del DOM 
    - Escuchar eventos de usuario (clicks, teclados, etc)

```js
/*===================
    getElementById
=====================
    
    - Este metodo selecciona un unico elemento por su id. Si no se encuentra devuelve null
    - Solo selecciona el primer elemento que coincida con el id
*/

let titulo = document.getElementById("titulo");
console.log(titulo); // <h1 id="titulo">Introduccion a JavaScript</h1>
console.log(titulo.textContent); // Introduccion a JavaScript


/*=====================
    querySelector
    querySelectorAll
=======================
    
    - querySelector(): Selecciona el PRIMER elemento que coincida con un selector CSS
    - querySelectorAll(): Selecciona TODOS los elementos que coincidan con un selector CSS
*/

let primerParrafo = document.querySelector(".mensaje");
console.log(primerParrafo.textContent); // Primer parrafo

let parrafos = document.querySelectorAll(".mensaje"); // Selector CSS
console.log(parrafos);

parrafos.forEach(parrafo => console.log(parrafo.textContent));
// Primer parrafo
// Segundo parrafo



/*=====================
    Modificar contenido y atributos
=======================
    
    - innerHTML: Modifica el contenido HTML dentro de un elemento
    - textContent: Modificar el texto dentro de un elemento
    - setAttribute(): Modifica los atributos de un elemento
    - style: Permite cambiar el estilo CSS en linea de un elemnto
*/

// Cambiar el texto con textContent
primerParrafo.textContent = "Este es el nuevo texto generado con JavaScript";

// Modificar el contenido HTML
primerParrafo.innerHTML = "<strong>Nuevo texto en negrita</strong>";

// Seleccionamos nuestro boton
let boton = document.getElementById("boton");

// Cambiar el atributo id
boton.setAttribute("id", "miSuperBoton");

// Cambiar el estilo
boton.style.backgroundColor = "#00ff41";
boton.style.padding = "10px";
boton.style.border = "2px solid";
boton.style.borderRadius = "5px";



/*=====================
    Eventos
=======================
    
Los eventos permiten a los desarrolladores detectar interacciones del usuario con la pagina web, como hacer click en un boton, escribir en un campo de texto (input), etc. Los eventos son fundamentales para hacer que una pagina web sea interactiva.

Un evento es una señal que se envia cuando ocurre una interaccion o cambio en el documento, como un click o una pulsacion de tecla. JavaScript permite escuchar estos eventos y ejecutar funciones especificas cuando ocurren.

Para poder ESCUCHAR un evento y responder a esta accion, podemos usar el metodo addEventListener. Este metodo permite adjuntar una funcion o un evento especifico a un elemento

Tipos comunes de eventos:

    - Eventos de mouse: click, dblclick, mouseover, mouseout, mousemove
    - Eventos de teclado: keydown, keyup
    - Eventos de formulario: submit, focus, input, change
    - Eventos de ventana: resize, scroll, load, unload
*/

// Estamos anexandole un escuchador de eventos a nuestro boton

function saludar() {
    alert("Hola mundo");
}
// Escribir la funcion directamentme
// boton.addEventListener("click", () => alert("Hola mundo"))
boton.addEventListener("click", saludar);


// Seleccionamos nuestro input
const escribir = document.getElementById("escribir");

// Puedo incorporar el objeto event en el parametro para acceder a la informacion del evento
escribir.addEventListener("keyup", function(event) {
    // console.log(`Tecla pulsada ${event.key}`); // Ahora event.key me dice especificamente que valor introduje

    // console.log(`Codigo de tecla ${event.code}`);

    // Vamos a mostrar por consola el valor del campo de texto, aca me conviene que el evento sea keyup (se detona el evento cuando termine de insertar un caracter)
    console.log(escribir.value);
});


/*================
    event
=================
El parametro event
    - Es implictamente pasado por el navegador al ejecutarse la funcion
    - Podemos llamarlo como querramos: event, e, evt, etc
    - Es una isntancia de objeto Event

El objeto event no solo me proporciona mas informacion del evento que fue detonado, sino tambien metodos para poder realizar ciertas acciones


==================================
    Propagacion de eventos
==================================
Cuando ocurre un evento, este se propaga a traves del DOM en dos fases

    - Fase de captura (de arriba hacia abajo)
    - Fase de burbuja (de abajo hacia arriba)

Podemos detener la propagacion de un evento usando el metodo event.stopPropagation()

    <div id="padre" class="borde">
        <button id="hijo">Boton</button>
    </div>
*/

const padre = document.getElementById("padre");
const hijo = document.getElementById("hijo");

// Vamos a escuchar el click en el div padre
padre.addEventListener("click", () => console.log("Se hizo click en el div padre"));


// Con event.stopPropagation() evitamos la propagacion de eventos
// Vamos a escuchar el click en el boton
hijo.addEventListener("click", event => {
    event.stopPropagation(); // Voy a detener la propagacion de eventos
    console.log("Se hizo click en el boton hijo");
});


// Con event.preventDefault() evitamos el envio por defecto de los formularios HTML
let miFormulario = document.getElementById("miFormulario");

miFormulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitamos el envio por defecto del formulario HTML
    alert("Formulario no enviado!");
    console.log("Validando datos...");
    console.log("Realizando otras operaciones...");
    console.log("Enviando datos al servidor gracias a la api fetch...");
});
```

---


## JavaScript V / Objetos globales y almacenamiento persistente. Iteracion en arrays, objetos y arrays de objetos

- *Ejercicios en JavaScript Ejercicios Tercera Parte en el Campus Virtual*

Las APIs son un conjunto de herramientas y funciones para poder interactuar con algo
El navegador nos provee justamente de herramientas y funciones para interactuar con el propio navegador. Por tanto, todas aquellas funciones con las que podemos interactuar con el navegador, a traves de funciones para la consola, ventanas flotantes, etiquetas de graficos como [canvas](https://www.w3schools.com/html/html5_canvas.asp) son APIs del navegador, llamadas APIs web.

**El navegador nos provee estas funcionalidades para interactuar con el navegador, estas APIs web a traves de los objetos globales**

### Que son los objetos globales entonces?
En JavaScript, los objetos globales son aquellos que estan disponibles en todo el entorno de ejecucion sin necesidad de importarlos o declararlos explicitamente. (a diferencia de `Math` o `Scanner` en Java).

Un entorno de ejecucion es el lugar donde se ejecuta JavaScript. Tanto el navegador, su entorno de ejecucion original como Node.js son entornos los entornos de ejecucion donde corre JavaScript.

**Los objetos globales** varian dependiendo del entorno de ejecucion, ya sea un navegador web o Node.js pero **su proposito es facilitar el acceso a ciertas funciones y valores predeterminados**

En el entorno del navegador, los objetos globales incluyen todos los objetos estandar de JavaScript (como Array, String, Object, etc), asi como un conjunto de objetos especificos para la interaccion con la pagina web y su entorno.

### El objeto global `window`
El objeto global principal en el entorno del navegador es `window`. Este objeto representa la ventana del navegador y actua como el contenedor global para todas las variables (var concretamente), funciones y objetos globales de una pagina web.

Todos los objetos y funciones definidos en el ambito global estan automaticamente disponibles como propiedades del objeto `window`. Algunos objetos y metodos importantes del objeto `window` son:

- `document`: Representa el [DOM](https://www.w3schools.com/whatis/whatis_htmldom.asp) de la pagina web actual, permitiendo el acceso y la manipulacion de elementos HTML

- `alert()`, `prompt()`, `confirm()`: Metodos que permiten mostrar dialogos al usuario mediante ventanas flotantes y tambien recoger input

- `setTimeout()`, `setInterval()`: Metodos para programar la ejecucion de codigo despues de un tiempo o en intervalos regulares, respectivamente

- `location`: Proporciona informacion sobre la URL actual de la pagina y permite redireccionar a otras URL

- `navigator`: Contiene informacion sobre el navegador, como la version, el agente de usuario y la geolocalizacion

- `console`: Proporciona acceso a la consola del navegador para mostrar mensajes de depuracion

- `localStorage()` y `sessionStorage()`: Permiten almacenar datos en el navegador de manera persistente o temporal
```js
localStorage.setItem("nombre", "Franco"); // Guardo el valor "Franco" en la clave "nombre" y este valor quedara permanentemente alojado en mi navegador

// Para obtener el resultado de un valor guardado en el localStorage, obtengo este valor a traves de obtener su clave
localStorage.getItem("carrito"); // Aca traigo todos los productos guardados en un carrito de compra

// Para verlos, puedo mostrarlos en la consola en formato tabla
console.table(localStorage.getItem("carrito"));
```

- `history`: Proporciona acceso al historial de navegacion de navegador

- `fetch`: Un objeto para realizar solicitudes HTTP asincronicas
```js
fetch("https://jsonplaceholder.typicode.com/users") // Para obtener todo el listado de usuarios de esta base de datos, gracias a hacer una peticion HTTP con el objeto fetch a este endpoint (url)
```

```js
// No tuve que instalar una libreria de console
// No tuve que importar esta libreria
// Tampoco tuve que crearla

console.log("Hola mundo"); // Mensajes o prints por consola
// window.prompt("Escribi un string"); // Ventanas flotantes para recibir input

// Podemos hacer estas funcionales porque hay objetos que nos las proveen

/*==================================
    Almacenamiento persistente
====================================

////////////
// Cookies
Las cookies son pequeños fragmentos de informacion que se almacenan en el navbegador del usuario y se envian con cada peticion HTTP. Son mas antiguas que localStorage y sessionStorage y son ampliamente usadas para mantener la sesion del usuario, guardar preferencias, etc

    - Pueden tener una fecha de expiracion especifica, si no, sera eliminada al cerrar la sesion del navegador
    - A diferencia de localStorage y sessionStorage, las cookies se envian al servidor con cada solicitud HTTP
    - Estan asociadas a un dominio especifico
    - Uso principal: Autenticacion, tokens. Preferencias del usuario que se envian al servidor. Seguimiento (tracking) de actividad en la web

/////////////////////
// localStorage 
localStorage es una API que permite almacenar datos de manera persistente en el navegador.

Los datos almacenados en el localStorage no tienen una fecha de expiracion, lo que significa que estaran disponibles despues de que el usuario cierre el navegador o apague la compu

    - Guardar datos que deben persistir incluso al cerrar el navegador
    - Almacenar configuraciones de usuario, temas, carrito de compras, etc
    - Tamaño max 5-10 MB por dominio
    - Persistente, no tiene expiracion

    1. Guardar datos: localStorage.setItem(clave, valor);
    2. Leer datos: localStorage.getItem(clave);
    3. Eliminar datos: localStorage.removeItem(clave);
    4. Eliminar todo: localStorage.clear();

///////////////////
// sessionStorage
sessionStorage es igual a localStorage pero con la diferencia de que los datos almacenados se mantienen disponibles solo durante la sesion del navegador. Cuando se cierra la pestaña o ventana del navegador, los datos se eliminan automaticamente

    - Guardar datos temporales mientras la pestaña este abierta
    - Informacion de formularios
    - Tamaño max 5-10 MB por dominio
    - Se borra al cerrar la pestña

    1. Guardar datos: sessionStorage.setItem(clave, valor);
    2. Leer datos: sessionStorage.getItem(clave);
    3. Eliminar datos: sessionStorage.removeItem(clave);
    4. Eliminar todo: sessionStorage.clear();
*/

// Seteamos el tema oscuro
// localStorage.setItem("tema", "oscuro");

// Seteamos el idioma de preferencia
// localStorage.setItem("idioma", "es");

// Guardamos un carrito de compras ficticio para que persista en nuestro navegador
let carrito = [
    { id: 1, nombre: "Hamburguesa", cantidad: 2 },
    { id: 2, nombre: "Faina", cantidad: 3 },
    { id: 3, nombre: "Fugazzeta rellena", cantidad: 4 },
    { id: 4, nombre: "Chopp Quilmes", cantidad: 2 },
];

// Para guardar esto en el localStorage, tengo que transformarlo en texto plano
console.log(carrito);
console.table(carrito);

// Aca justamente aparece JSON (JavaScript Object Notation), es decir, la notacion de objetos de JavaScript. Es basicamente un formato de texto plano
let carritoJSON = JSON.stringify(carrito); // Convierto mi array de objetos en texto plano

console.log(carritoJSON); // [{"id":1,"nombre":"Hamburguesa","cantidad":2},{"id":2,"nombre":"Faina","cantidad":3},{"id":3,"nombre":"Fugazzeta rellena","cantidad":4},{"id":4,"nombre":"Chopp Quilmes","cantidad":2}]

// Tambien puedo transformar mi texto plano JSON en un array de objetos
console.table(JSON.parse(carritoJSON));

// Guardamos el carrito de compras en el localStorage
// localStorage.setItem("carrito", carritoJSON);

// Para mostrar por consola mi item carrito del localStorage
let miCarrito = localStorage.getItem("carrito");
console.table(JSON.parse(miCarrito));


/*========================================
    Como almacenar datos en JavaScript?
==========================================

Almacenar datos implica elegir la estructura adecuada de acuerdo con el tipo de informacion que se quiera guardar y como se desee manipular.

    - Variables simples: Para valores unicos como numeros y strings
    - Objetos: Para representar datos complejos con propiedades
    - Arrays: Para almacenar listas de elementos del mismo tipo (idealmente)
    - Arrays de objetos: Para manejar listas de elementos complejos que contienen multiples propiedades
*/

////////////
// Objetos

// Un objeto en JavaScript es una coleccion de propiedades, donde cada propiedad tiene un nombre clave y un valor. Los objetos son ideales para representar una unica entidad o elemento que tiene varias propiedades o atributos

let persona = {
    nombre: "Federico",
    edad: 30,
    ocupacion: "Desarrollador web"
};

/* Cuando usar objetos

    - Cuando deseemos representar una entidad UNICA con multiples atributos
    - Cuando sabemos que no habra multiples instancias o copias de esos datos en la aplicacion
    - Cuando necesitamos acceder a propiedades especificas mediante sus nombres


/////////////////////
// Array de objetos

Cuando necesitamos almacenar varias instancias del mismo tipo de entidad (lista de personas, lista de productos, lista de pedidos, etc) es comun usar un array de objetos

Un array de objetos es una estructura que permite almacenar multiples objetos donde cada objeto tiene la misma estructura o contiene atributos similares

    let carrito = [
        { id: 1, nombre: "Hamburguesa", cantidad: 2 },
        { id: 2, nombre: "Faina", cantidad: 3 },
        { id: 3, nombre: "Fugazzeta rellena", cantidad: 4 },
        { id: 4, nombre: "Chopp Quilmes", cantidad: 2 },
    ];

Cuando usar arrays de objetos?

    - Cuando necesitamos almacenar multiples instancias de una misma entidad o estructura de datos
    - Cuando necesitamos aplicar metodos de los arrays como map, filter, find, reduce, etc
    - Usos comunes: Lista de usuarios registrados, inventario de productos, historial de transacciones, etc

===================
    En resumen
===================

Objeto simple: Para una unica entidad
    - Cuando solo tenemos una entidad, como config de usuario, o un unico elemento que contiene datos con varias propiedades
    - Acceder a propiedades individuales de un objeto es rapido y sencillo

Array simple: Para listas sencillas de datos primitiovos
    - Para una lista ordenada de elementos individuales (lista de nombres, de ids, etc) donde cada elemento no requiere atributo adicionales.
    - En casos asi, un array simple de valores primitivos es suficiente

Array de objetos: Para colecciones de entidades complejas, ideales para trabajar en conjunto
    - Cuando tenemos una lista de entidades complejas, cada una con multiples propieades
    - Esta configuracion nos permite realizar operaciones en lote y mantener una coleccion de  elementos realizacionados de forma organizada
*/



/*======================
    Bucle for clasico
========================

    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
    }

    - Ventajas: Maxima velocidad y control (podemos usar break y continue)
    - Desventajas: Mas verboso (mas dificil de leer)
*/

// Sumar elementos
const numeros = [1, 2, 3, 4, 5];
let suma = 0;
for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i];
}
console.log(suma); // 15

// Buscar el elemento que comience con "ban", consologuearlo y salirnos del bucle
const frutas = ["manzana", "banana", "naranja"];
for (let i = 0; i < frutas.length; i++) {
    if (frutas[i].startsWith("ban")) {
        console.log(frutas[i]); // banana
        break;
    }
}


const productos = [
    { id: 1, nombre: "Hamburguesa", cantidad: 2, precio: 15000 },
    { id: 2, nombre: "Faina", cantidad: 3, precio: 800 },
    { id: 3, nombre: "Porcion fugazzeta rellena", cantidad: 4, precio: 3500 },
    { id: 4, nombre: "Chopp Quilmes", cantidad: 2, precio: 6000 },
    { id: 5, nombre: "Gaseosa DIA", cantidad: 5, precio: 600 },
];

// Filtrar productos caros > 6000 y guardar los productos caros en un array
let precioMax = 6000;
let losInalcanzables = [];

for (let i = 0; i < productos.length; i++) {
    if (productos[i]["precio"] >= precioMax) {
        losInalcanzables.push(productos[i]);
    }
}

console.log(losInalcanzables); // [{id: 1, nombre: 'Hamburguesa', cantidad: 2, precio: 15000}, {id: 4, nombre: 'Chopp Quilmes', cantidad: 2, precio: 6000}]


/*======================
    Bucle forEach
========================

    array.forEach((elemento, indice, arrayOriginal) => {
        console.log(elemento, indice);
    })

    - Ventajas: Sintaxis limpia, no necesita contador
    - Desventajas: Mas lento y no se puede romper con break ni continue
*/


const colores = ["rojo", "verde", "azul"];
colores.forEach(color => console.log(color));

/* // Exactamente igual que arriba pero con una funcion declarada en lugar de una arrow function
colores.forEach(function(color) {
    console.log(color)
})
*/
// rojo
// verde
// azul

// Crear un nuevo array con los numeros duplicados 
// const numeros = [1, 2, 3, 4, 5];
const numerosDobles = []; // Iniciamos un array vacio al que le iremos pusheando los valores
numeros.forEach(num => numerosDobles.push(num * 2));
console.log(numerosDobles); // [2, 4, 6, 8, 10]

const estudiantes = [
    { nombre: "Federico", nota: 10 },
    { nombre: "Santiago", nota: 8 },
    { nombre: "Fatima", nota: 9 },
    { nombre: "Franco", nota: 4 },
    { nombre: "Agus", nota: 2 },
    { nombre: "Ernesto", nota: 7 },
    { nombre: "Juliana", nota: 8 },
];

// Actualizar propiedades de los estudiantes asignando un aprobado = true si la nota fue >= 7
estudiantes.forEach(estudiante => estudiante.aprobado = estudiante.nota >= 7);
console.table(estudiantes);



// Metodos funcionales: map, filter, reduce, find y findIndex, for...of, some y every
/*======================
    map()
========================

    const nuevosValores = array.map(elemento => elemento * 2);

    - Proposito: Transformar cada elemento
    - Retorna: Nuevo array con los resultados
*/

// Array de cuadrados
// const numeros = [1, 2, 3, 4, 5];
const cuadrados = numeros.map(num => num * num);
console.log(cuadrados); // [1, 4, 9, 16, 25]

// Convertir a strings
const edades = [34, 25, 20, 46];
const edadesSaludo = edades.map(edad => `Hola! Tengo ${edad} años`);
console.log(edadesSaludo); // ['Hola! Tengo 34 años', 'Hola! Tengo 25 años', 'Hola! Tengo 20 años', 'Hola! Tengo 46 años']


/* Generar un nuevo array con los nombres de los estudiantes
const estudiantes = [
    { nombre: "Federico", nota: 10 },
    { nombre: "Santiago", nota: 8 },
    { nombre: "Fatima", nota: 9 },
    { nombre: "Franco", nota: 4 },
    { nombre: "Agus", nota: 2 },
    { nombre: "Ernesto", nota: 7 },
    { nombre: "Juliana", nota: 8 },
];*/
const nombresEstudiantes = estudiantes.map(estudiante => estudiante.nombre);
console.log(nombresEstudiantes); // ['Federico', 'Santiago', 'Fatima', 'Franco', 'Agus', 'Ernesto', 'Juliana']


/*======================
    filter()
========================

    const filtrados = array.filter(elemento => elemento > 10)

    - Proposito: Seleccionar los elementos que cumplan una condicion (y de true)
    - Retorna: Nuevo array con los elementos filtrados
*/

const numerosGrandes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// Filtrar los numeros pares con filter
const numerosPares = numerosGrandes.filter(num => num % 2 === 0);
console.log(numerosPares); // [2, 4, 6, 8, 10]


// Filtrar strings largos > 5 caracteres
const palabras = ["holis", "chau", "bienvenido", "ok", "supercalifragilisticuespialidoso"];
const palabrasLargas = palabras.filter(p => p.length > 5);
console.log(palabrasLargas)
/* // Mismo resultado que arriba pero sin la comodidad de la sintaxis de la funcion flecha
const palabrasLarguisimas = palabras.filter(function(p) {
    return p.length > 5
}); */

/* Generar un nuevo array con los estudiantes que tengan mas de un 8
const estudiantes = [
    { nombre: "Federico", nota: 10 },
    { nombre: "Santiago", nota: 8 },
    { nombre: "Fatima", nota: 9 },
    { nombre: "Franco", nota: 4 },
    { nombre: "Agus", nota: 2 },
    { nombre: "Ernesto", nota: 7 },
    { nombre: "Juliana", nota: 8 },
];*/
const estudiantesProMax = estudiantes.filter(estudiante => estudiante.nota > 8);
console.table(estudiantesProMax);



/*======================
    reduce()
========================

    const suma = array.reduce((total, elemento) => total + elemento, 0)

    - Proposito: Reducir el array a un unico valor
    - Retorna: Valor acumulado
*/
// Sumar elementos
const decenas = [10, 20, 30];
const sumaDecenas = decenas.reduce((total, num) => total + num, 0); // El 0 es el valor del total
console.log(sumaDecenas); // 60


// Obtener el valor total de todo lo vendido (ventas x cantidad)
const ventas = [
    { producto: "Camisa", cantidad: 3, precio: 25 },
    { producto: "Pantalon", cantidad: 2, precio: 40 },
    { producto: "Zapatos", cantidad: 1, precio: 80 },
];

const totalVentas = ventas.reduce((total, venta) => total + (venta.cantidad * venta.precio), 0);
console.log(totalVentas); // 235
console.log("1" + 1); // Ojota! Esto da 11



/*========================
    find() y findIndex()
==========================

    const encontrado = array.find(elemento => elemento.id === 123);
    const indice = array.findIndex(elemento => elemento.id === 123);

    - Proposito: Buscar el primer elemento que cumpla una condicion
    - Retorna: Elemento o Indice (o undefined / -1 si no lo encuentra)
    - (Hacen lo mismo que filter pero devuelven solo la primer coincidencia)
*/

const numerosRandom = [5, 12, 8, 130, 44];

// Encontramos el primero que supere 10
const encontrado = numerosRandom.find(num => num > 10);
console.log(encontrado); // 12

// Encontrar el indice del numero superior a 100
const indice = numerosRandom.findIndex(num => num > 100);
console.log(indice); // 3




/*========================
    some() y every()
==========================

    const algunoCumple = array.some(elemento => elemento > 0);
    const todosCumplen = array.every(elemento => elemento > 0);

    - Proposito: Verificar si alguno / todos cumplen una condicion
    - Retorna: Booleano
*/

const numsRandom = [1, 3, 5, 7, 8];
const hayPares = numsRandom.some(num => num % 2 === 0);
console.log(`Hay pares?: ${hayPares}`); // Hay pares?: true

const todosPositivos = numsRandom.every(num => num > 0);
console.log(todosPositivos); // true

/* Comprobar si todos los estudiantes aprobaron
const estudiantes = [
    { nombre: "Federico", nota: 10 },
    { nombre: "Santiago", nota: 8 },
    { nombre: "Fatima", nota: 9 },
    { nombre: "Franco", nota: 4 },
    { nombre: "Agus", nota: 2 },
    { nombre: "Ernesto", nota: 7 },
    { nombre: "Juliana", nota: 8 },
];*/

const hayAprobados = estudiantes.every(estudiante => estudiante.nota >= 4);
console.log(`Aprobaron todos? ${hayAprobados}`);




/*========================
    for...of
==========================

    for (const elemento of array) {
        console.log(elemento);
        if (elemento === "algo") break;
    }

    - Ventajas: Sintaxis limpia y permite break y continue
    - Desventajas: No provee indice automaticos
*/

const empleados = [
    { nombre: "Nahuel", salario: 1000 },
    { nombre: "Lautaro", salario: 1500 },
    { nombre: "Alan", salario: 2000 },
    { nombre: "Agus", salario: 3000 },
];

for (const empleado of empleados) {
    if (empleado.salario >= 2000) {
        console.log(`${empleado.nombre} gana terrible plata!`);
        break;
    }
}



/*=========================
    Iteracion de objetos
===========================

    - for...in
    - Object.keys(), Object.values(), Object.entries()



==================================
    Comparacion de Rendimiento
==================================

    1. Bucles clasicos (for, while) son los mas rapidos para iteraciones simples
    2. Metodos funcionales (map, filter, etc) son mas lentos pero mas expresivos (faciles de leer)
    3. for...of ofrece un buen equilibrio entre rendimiento y legibilidad


==================================
    Recomendaciones de uso
==================================

    - Transformar un array:     map()
    - Filtrar elementos:        filter()
    - Reducir a un valor:       reduce()
    - Buscar elemento:          find() y findIndex()
    - Bucle sencillo de leer:   forEach()
    - Necesito usar break:      for...of, for clasico
    - Verificar condiciones:    some() y every()
*/
```


---

## JavaScript IV / Introduccion a Arrays y objetos, metodos de strings y arrays I
*Ejercicios sugeridos del Campus hasta JavaScript Ejercicios Tercera Parte*

En JavaScript, los arrays y objetos son estructuras de datos fundamentales. 
- **Los arrays se utilizan para almacenar una lista ordenada de elementos**
- **Los objetos son ideales para almacenar datos con propiedades clave-valor**

Cuando usar cada uno?
- **Usaremos arrays**: Cuando necesitemos almacenar una lista ordenada de elementos (idealmente comunes, como una lista de nombres)
- **Usaremos objetos**: Cuando tengamos datos estructurados que pueden agruparse en propiedades clave-valor (como los atributos de una persona o las especificaciones de un producto)

#### EXTRA
Otras estructuras de datos utiles

- [Map](https://www.w3schools.com/js/js_maps.asp): Coleccion de pares clave-valor donde las claves pueden ser de cualquier tipo, incluso objetos o funciones
```js
const mapa = new Map();
mapa.set(123, "ID");
mapa.set(true, "activo");
```

- [Set](https://www.w3schools.com/js/js_sets.asp): Un `Set` es una coleccion de valores unicos, no permite valores duplicados
```js
const conjunto = new Set([1, 2, 2, 3]);
conjunto.add(4);
console.log(conjunto); // Set(4) {1, 2, 3, 4}
```

**JavaScript "envuelve" en objetos los tipos de datos primitivos como strings o numeros, es decir los trata como objetos otorgandoles metodos (Object Wrappers)**

```js
/*======================
    Arrays en JS
========================

Un array es una lista ordenada de elementos donde cada uno tiene una posicion o indice.
Los arrays en JS son muy flexibles: pueden contener cualquier tipo de datos (numeros, cadenas, booleanos, otros arrays, objetos, funciones, etc) y los elementos no tienen por que ser del mismo tipo
*/

let colores = ["azul", "verde", "rojo"];
console.log(colores[0]); // azul
console.log(colores[2]); // rojo


/*======================
    Objetos en JS
========================

Un objeto en JavaScript es una coleccion de pares clave-valor
Las claves son strings que identifican a cada valor, lo cual permite un acceso rapido y estructurado a los datos.
*/

let persona = {
    nombre: "Nico",
    edad: 30,
    ciudad: "Berazategui"
};

// Podemos acceder a las propiedades de un objeto mediante la notacion de punto y de corchete
// Notacion de punto
console.log(persona.nombre); // Nico

// Notacion de corchete
console.log(persona["ciudad"]); // Berazategui

// Agregamos una propiedad
persona.pais = "Argentina";

// Eliminamos una propiedad
delete persona.edad;

console.log(persona); // {nombre: 'Nico', ciudad: 'Berazategui', pais: 'Argentina'}


// Metodos de objetos: Los objetos tambien pueden tener metodos, que son funciones almacenadas en una propiedad
let perro = {
    nombre: "Batata",
    ladrar: function() {
        console.log("Guau!");
    }
};

perro.ladrar(); // Guau!


/*===============================
    Metodos de strings en JS
===============================*/

// 1. length: Devuelve la longitud de un string
console.log("Hola".length); // 4

// 2. charAt(index): Devuelve el caracter en la posicion especificada
console.log("Hola".charAt(2)); // l

// 3. concat(str1, str2): Concatena strings
console.log("Hola".concat(" ", "mundo!")); //Hola mundo!

// 4. includes(substring): Devuelve true si el substring esta en el string
console.log("JavaScript".includes("Script")); // true (es case sensitive)

// 5.   startsWith: Comprueba si el string comienza con el substring
//      endsWith: Comprueba si el string termina con el substring
console.log("Hola mundo".startsWith("Hola")); // true

// 6.   indexOf(substring): Devuelve el indice de la PRIMERA aparicion del substring
//      lastIndexOf(substring): Devuelve la ULTIMA aparicion del substring
console.log("banana".indexOf("a")); // 1
console.log("banana".lastIndexOf("a")); // 5

// 7. replace(searchValue, newValue): Reemplaza una parte del string
console.log("Hola mundo".replace("mundo", "Div 334")); // Hola Div 334

// 8. replaceAll(searchValue, newValue): Reemplaza TODAS las apariciones
console.log("1, 2, 3, 4, 5".replaceAll(", ", ";")); // 1;2;3;4;5

// 9.   toLowerCase(): Convierte a minusculas
//      toUpperCase(): Convierte a mayusculas
console.log("AGUANTE SAN LORENZO".toLowerCase()); // aguante san lorenzo
console.log("hola profe, disculpe soy muy timido".toUpperCase()); // HOLA PROFE, DISCULPE SOY MUY TIMIDO

// 10.  trim(): Elimina espacios en blanco al inicio y al final
//      trimStart(): Elimina espacios al principio
//      trimEnd(): Elimina espacios al final
console.log("      Hola   ".trim()); // 

// 11. slice(start, end): Extrae parte del string
console.log("JavaScript".slice(0, 4)); // Java
console.log("JavaScript".slice(-6)); // Script

// 12. substring(start, end): Similar a slice pero no acepta negativos
console.log("JavaScript".substring(4, 10)); // Script

// 13. split(separator): Divide el string en un array
console.log("Hola".split("")); // ['H', 'o', 'l', 'a']
console.log("rojo, verde, azul".split(", ")); // ['rojo', 'verde', 'azul']

// 14. repeat(count): Repite el string
console.log("ji".repeat(3)); // jijiji

// 15. match(regex): Devuelve coincidencias con una expresion regular
console.log("abc123".match(/\d+/g)); // ['123']



/*===============================
    Metodos de arrays en JS
===============================*/

// 1. length: Devuelve la longitud del array
console.log([1, 2, 3, 4, 5].length); // 5

// 2. push(element): AGREGA un elemento al FINAL del array
let arr = [1, 2];
arr.push(3);
console.log(arr); // [1, 2, 3]

// 3. pop(): ELIMINA el ultimo elemento del array y lo devuelve
arr.pop();
console.log(arr); // [1, 2]
// console.log(arr.pop()); // 3

// 4. unshift(element): AGREGA un elemento al INICIO del array
arr.unshift(0);
console.log(arr); // [0, 1, 2]

// 5. shift(): ELIMINA el primer elemento y lo devuelve
console.log(arr.shift()); // 0

// 6. concat(array): Concatena arrays
console.log([1, 2, 3, 4, 5].concat([6, 7, 8, 9, 10])); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 7. join(separator): Une los elementos en un string
console.log([1, 2, 3, 4, 5].join("-")); // 1-2-3-4-5

// 8. slice(start, end): Extrae una copia parcial del array
console.log([1, 2, 3, 4, 5].slice(1, 3)); // 2, 3

// 9. splice(start, deleteCount, ...items): Modifica el array in situ y nos permite borrar y agregar
let miArray = [1, 2, 3, 4, 5];
miArray.splice(1, 2, "dos", "tres"); // posicion 1, 2 elementos a eliminar, "valores1", "valores2"
console.log(miArray); // [1, 'dos', 'tres', 4, 5]

// 10.  indexOf(element): Devuelve la primera posicion del elemento o -1
//      lastIndexOf(element): Devuelve la ultima posicion del elemento o -1
console.log([1, 2, 3, 4, 5].indexOf(3)); // 2 -> El 3 se encuentra en la posicion 2

// 11. includes(element): Devuelve true si el elemento existe
console.log([1, 2, 3, 4, 5].includes(3)); // true
```

---


## JavaScript III / Scope y ambito, funciones y tipos de funciones
```js
/*=============================
    Scope / Ambito o Alcance
===============================

El scope, alcance o ambito se refiere al contexto en el cual las variables y las funciones son accesibles y pueden ser referenciadas.

Entender el scope es clave para que podamos escribir codigo claro y sin errores, tenemos distintos tipos de scope en JavaScript


    1. Global Scope o Ambito Global:
        - Las variables declaradas FUERA de cualquier funcion o bloque {} tienen alcance global y son accesibles desde CUALQUIER PARTE DEL CODIGO. Esto incluye a var, let y const
        - En el caso de las viejas variables var, estas variables se adjuntan al objeto global window, pudiendo ser accesibles desde la consola


    2. Local Scope / Function Scope (Ambito local / Ambito de funcion)
        - Este es el alcance exclusivamente de las viejas variables var
        - Las variables declaradas DENTRO DE UNA FUNCION, solo son accesibles dentro de esa funcion


    3. Block Scope (Ambito de bloque)
        - A partir de ES6, las nuevas variables let y const tienen alcance de bloque
        - Esto significa que estas variables SOLO son accesible DENTRO DEL BLOQUE -> {}
        - Esto afecta a las llaves de un if, un for, etc {}
*/

// Ejemplo global scope
let variableGlobal = "Soy una variable global";

function mostrarGlobal() {
    console.log(variableGlobal);
}

mostrarGlobal(); // Soy una variable global
console.log(variableGlobal); // Soy una variable global


// Ejemplo de Local scope / Function scope (exclusivos de var)
function mostrarLocal() {
    // Esta variable definida dentro de la funcion NO se puede acceder fuera de esta funcion
    var localVar = "Soy una variable local";
    console.log(localVar);
}

mostrarLocal(); // Soy una variable local
// console.log(localVar); // Uncaught ReferenceError: localVar is not defined


// Ejemplo de Block scope / Alcance de bloque (let y const)
if (true) {
    let bloqueLet = "Soy una let de bloque"; // No puedo acceder a la variable definida fuera del bloque { } (no exclusivamente las funciones)
    console.log(bloqueLet);
}

// console.log(bloqueLet); // Uncaught ReferenceError: bloqueLet is not defined


// Function scope: Las variables declaradas con var tienen ambito de funcion. Esto significa que si se declarar dentro de una funcion NO son accesibles fuera de esa funcion, pero no estan limitadas por bloques

// Block scope: Las variables declaradas con let y const estan limitadas por el bloque en que se declaran
function scopeFunction() {
    if (true) {
        var funcionVar = "Soy una var de funcion";
    }
    console.log(funcionVar);
}

scopeFunction(); // Soy una var de funcion


function scopeBloque() {
    if (true) {
        let bloqueLet = "Soy una let de bloque";
        const bloqueConst = "Soy una const de bloque";

        console.log(`Probando el bloqueLet: \n${bloqueLet}`);
    }

    // console.log(bloqueLet); // Uncaught ReferenceError: bloqueLet is not defined
    // console.log(bloqueConst); // Uncaught ReferenceError: bloqueConst is not defined
}

scopeBloque();


/*=============================
    Hoisting o Elevacion
===============================

Las declaraciones de variables y funciones en JavaScript se mueven "hacia arriba" de su contexto de ejecucion (scope). 
Solo las declaraciones son elevadas, no las inicializaciones.

    var: Se elevan y se inicializan con undefined

    let y const: Se elevan pero NO se inicializan, lo que lleva a un error si se accede antes de la declaracion
*/

console.log(elevadaVar); // undefined -> No me deberia dejar acceder a esta variable!
var elevadaVar = "Soy una var elevada";
console.log(elevadaVar); // Soy una var elevada


// console.log(elevadaLet); // Uncaught ReferenceError: Cannot access 'elevadaLet' before initialization
let elevadaLet = "Soy una let elevada";
console.log(elevadaLet);



/*=============================
    var vs let y const
===============================

    var
        - Tiene ambito de funcion
        - Permite la redeclaracion
        - Permite la reasignacion

    let 
        - Tiene ambito de bloque
        - NO permite la redeclaracion
        - SI permite la reasignacion

    const
        - Tiene ambito de bloque
        - NO permite la redeclaracion
        - NO permite la reasignacion

    
- let y const se introdujeron en ES6 (EcmaScript 2015) para mejorar el ambito de las variables y reducir la probabilidad de anulaciones accidentales de variables

- Tanto let como const no permiten la elevacion mientras que var si. EXTRA / tecnicamente let y const SI tienen hoisting, pero estan en la TDZ (Temporal Dead Zone) hasta la inicializacion
*/

// Ejemplo de redeclaracion
var saludo = "Holis";
var saludo = "Que onda!";
console.log(saludo);

let despedida = "Adios";
// let despedida = "Chauchi!" // Cannot redeclare block-scoped variable 'despedida'.ts(2451)

despedida = "Aburiño"; // let si permite la reasignacion, const no
console.log(despedida);


/*=============================
    Funciones en JavaScript
===============================

Una funcion es un BLOQUE DE CODIGO REUTILIZABLE que se puede ejecutar cuando se llama por su nombre

Las funciones son fundamentales para la modularidad y reutilizacion del codigo

    - Facilitan la organizacion del codigo
    - Permiten la reutilizacion
    - Mejora la legibilidad y el mantenimiento



/////////////////////
// Funcion declarada
La forma mas comun de declarar una funcion en JavaScript es usando la palabra clave o keyword function

    function nombreFuncion() {
        // Bloque de codigo a ejecutar cuando se llame a la funcion
    }
*/

function sumaSimple() {
    let resultado = 5 + 3;
    console.log("El resultado es: ", resultado);
}

sumaSimple();


// Una funcion con parametros es extremadamente mas util porque permite recibir infinidad de valores
// a y b son nuestros parametros, son variables definidas en las funciones que aceptan valores cuando se llama a esta funcion
function sumar(a, b) { 
    let resultado = a + b;
    console.log("El resultado es: ", resultado);
}

// Ahora si podremos reaprovechar esta funcion tantas veces como necesitemos
sumar(6, 7); // 13 -> Los argumentos (6 y 7) son los valores que pasamos a la funcion cuando la llamamos

let uno = 1;
let seis = 6;
sumar(uno, seis); // 7


// Las funciones tambien pueden devolver un valor, usando la palabra clave return
function multiplicar(a, b) {
    return a * b; // Ojota! Retorna un valor, pero no aparece visualmente en ningun lado
}

console.log(multiplicar(5, 5)); // 25


/*=================================
    10 tipos de funciones en JS
===================================

//////////////////////////
// 1. Funcion declarada     (Named function o Basic Function)

Es la declaracion basica de JavaScript, usa la keyword function

Se recomienda para funciones con nombre o cuando se necesite HOISTING.
Las funciones declaradas (con la keyword function) se pueden elevar a la parte superior de su ambito, es decir, del scope que las contiene.

Esto quiere decir que estas funciones pueden ser llamadas ANTES de ser DECLARADAS*/

saludar(); // Hola holita, vecinito

function saludar() {
    console.log("Hola holita, vecinito");
}

saludar(); // Hola holita, vecinito



/*////////////////////
// Funciones anonimas       (Anonymous functions)

Son las funciones que se definen sin un nombre identificador, compartandose como expresiones que se asignan a variables o se pasan como argumentos a otras funciones (callbacks -> los veremos en JavaScript VII)

A diferencia de las funciones declarativas nombradas, estas NO se elevan (hoisting) y se utilizan para tareas como callbacks, manejadores de eventos o para crear IIFE (Immediately Invoked Function Expressions)

Casos de usos comunes: callbacks, IIFE, Eventos


//////////////////////////
// 2. Funcion expresada     (Function expression)

Es la funcion que esta dentro de una variable

Son utiles para funciones anonimas, para cuando se quiere controlar donde va a estar disponible la funcion o para cuando va a ser usada como argumento para otra funcion (callback) */

const saludarExpresada = function() {
    console.log("Como le va troesma, todo bien?");
}

saludarExpresada(); // Como le va troesma, todo bien?


// Ejemplo de funcion anonima: Temporizador
setTimeout(function() {
    console.log("Holis dentro de 3 segundos");
}, 3000);


/*////////////////////////
// 3. Funcion flecha     (Arrow function)

Son especialmente utiles para escribir funciones de una sola linea.
No tienen su propio this y siempre son anonimas 
*/
const sumaFlecha = (a, b) => a + b; // El return esta implicito!
console.log(sumaFlecha(4, 2));


/*////////////////////////
// 4. Funcion de metodos     (Method function)

Son funciones definidas dentro de un objeto o clase
*/

const persona = {
    nombre: "Federico",
    saludar() {
        console.log(`Hola, me llamo ${this.nombre}`);
    }
}

persona.saludar(); // Hola, me llamo Federico


/*////////////////////////
// 5. Funcion de constructor     (Constructor function)

Se usan para crear objetos, se invocan usando el keyword new
*/

function Usuario(nombre, id) {
    this.nombre = nombre;
    this.id = id;
}

const fatima = new Usuario("Fatima", 12345);
console.log(fatima.id); // 12345



/*////////////////////////
// 6. Expresion de funcion ejecutada inmediatamente o IIFE - Immediately Invoked Function Expression

Las IIFE son funciones que se ejecutan INMEDIATAMENTE despues de haberse definidos
*/

(function() {
    console.log("Holis! Soy una IIFE rapidisssssima!!");
})(); // Holis! Soy una IIFE rapidisssssima!!




/*////////////////////////
// 7. Funcion generadora   (Generator function)

Son funciones que sirven como una fabrica de iteradores. Es decir, pausan su ejecucion y continuan mas tarde.

Se definen usando las expresion function*
*/



/*////////////////////////
// 8. Funcion de alto nivel (o funcion de orden superior / High Order Functions - HOF)

Las HOF nos permiten usar otras funciones como parametros o devolver funciones como resultado

Ejemplos de estas funciones son map, filter, reduce, forEach, every, some, etc (Las veremos en JavaScript V)
*/




/*////////////////////////
// 9. Function asincronica   (Async function)

Las funciones asincronicas se declaran con la keyword async y devuelven un objeto Promise que representa el exito o fracaso de una operacion asincronca

Se usa el operador await para esperar a la operacion asincronica (lo veremos en JavaScript VII y VIII)*/


/*=================================
    6 tipos de funciones flecha
=================================*/

// 1. Sin parametros: Si la funcion no lleva parametros, se pueden usar parentesis vacias
const despedidaFlecha = () => console.log("Chau nos vemos!");
despedidaFlecha(); // Chau nos vemos!


// 2. Un solo parametro: Si hay un solo parametro, las parentesis son opcionales
const cuadrado = x => x * x;
console.log(cuadrado(4)); // 16


// 3. Mas de un parametro: Las parentesis son obligatorias
const division = (a, b) => a / b;
console.log(division(10, 2)); // 5


// 4. Mas de una instruccion en la funcion: Necesitamos usar {} y return si queremos devolver un valor
const creaSaludo = nombre => {
    const mensaje = `Hola ${nombre}!`;
    return mensaje;
}

console.log(creaSaludo("Santiago")); // Hola Santiago!


// 5. Devolviendo un objeto: Para devolver un objeto literal, debe estar envuelto en parentesis para que no se confunda con el cuerpo de la funcion
const creaPersona = (nombre, edad) => ({nombre: nombre, edad: edad});
console.log(creaPersona("Gabi", 25)); // {nombre: 'Gabi', edad: 25}
console.log(creaPersona("Ernesto", 30));
console.log(creaPersona("Esteban", 35));


// 6. High order functions y callbacks: Las funciones de flecha son especialmente populares cuando se usan como callbacks
const numeros = [1, 2, 3, 4, 5];
const duplicar = numeros.map(num => num * 2);

// Exactamente igual que la funcion de arriba, se ve como la funcion flecha ahorra y simplifica todo
const duplicando = numeros.map(function(num) {
    return num * 2;
});

console.log(duplicar); // [2, 4, 6, 8, 10]
```


---


## JavaScript II / Control de Flujo, Estructuras de Control, Condicionales y Bucles I
- [Halt & Catch Fire instruccion](https://es.wikipedia.org/wiki/Halt_and_Catch_Fire)
- [Halt & Catch Fire serie](https://es.wikipedia.org/wiki/Halt_and_Catch_Fire_(serie_de_televisi%C3%B3n))
```js
/*========================
    Control de flujo
==========================

El control de flujo determina como se ejecutan las instrucciones en un programa.
Al diseñar un programa, es importante establecer que partes del codigo se ejecutan y bajo que condiciones.

En JavaScript, esto se logra mediante estructuras de control que permiten ejecutar sentencias de codigo basadas en decisiones, repeticiones o condiciones especificas. Tenemos distintos tipos de estructuras de control de flujo:

    1. Condicionales
        - if, else if, else
        - Operadores logicos: &&, ||, !
        - Operadores ternarios

    2. Bucles
        - for
        - while
        - do...while

    3. Control de flujo avanzado
        - break
        - continue
        - switch




======================
    Condicionales
======================

La condicional if se usa para ejecutar un bloque de codigo si la condicion es verdadera

    if (condicion) {
        // Codigo que se ejecuta si la condicion es verdadera

    } else if (condicion2) {
     // Codigo que se ejecuta si la condicion2 es verdadera

    } else {
     // Codigo si ninguna condicion es verdadera
    } 
*/

// Le pedimos input al usuario
/*
let numero = prompt("Escribi un numero"); // Por defecto, devuelve un string
console.log(numero, typeof numero); // 2 string
*/
/*
let numero = parseInt(prompt("Escribi un numero"));
console.log(numero, typeof numero); // 2 'number'

if (numero > 0) {
    console.log("El numero es positivo");

} else if (numero < 0) {
    console.log("El numero es negativo");

} else {
    console.log("El numero 0");
}
*/

// Quiero verificar que un usuario pueda manejar
let edad = 20;
let tieneLicencia = true;

if (edad >= 18 && tieneLicencia) {
    console.log("Podes manejar");
}

if (edad < 18 || !tieneLicencia) {
    console.log("No podes manejar");
}


// EL operador ! me permite verificar si una variable es falsy
let valor1 = 0;         // 0 es un valor falsy
let valor2 = "Hola";    // Una cadena no vacia es un valor truthy

console.log(!valor1);   // true -> 0 es falsy, asi que se convierte en true
console.log(!valor2);   // false -> Una cadena no vacia es truthy, por lo que se convierte en false

// La logica del alternador se llama toggle, y es un caso de uso comun para el operador !, lo que nos permitira alternar entre true y false

/* Ejemplo de redeclaracion, let y const no lo permiten
let coso = "coso";
let coso = "otra cosa";
*/

// Ejemplo de reasignacion, let lo permite
let numero = 15;
numero = 17;

let estado = true;

function alternarEstado() {
    // Agarro el valor de estado, sea cual sea y lo invierto
    estado = !estado; // reasigno el valor de estado, estado es igual a su contrario
    console.log("Nuevo estado: ", estado);
}

alternarEstado();
alternarEstado();
alternarEstado();


// Operador ternario: Una forma mas compacta de escribir una condicion if else
let anios = 34;
let mensaje = (edad >= 18) ? "Sos mayor de edad" : "Sos menor de edad";
console.log(mensaje);

let temperatura = 17;
let mensajeTemp;
mensaje = (temperatura > 22) ? "Hace alto calor, vamos a abrir una birra" : "Hace un chiflete de la gran flauta, vamos a abrir una birra";
console.log(mensaje);



/*=======================
    Bucle for clasico
=========================

- Se usa cuando se conoce de antemano el numero de iteraciones
- Es el mas rapido

    for (inicializacion; condicion; incremento) {
        // Codigo a ejecutar en cada iteracion
    }
*/

console.log("Mensaje previo al bucle");

// Mi codigo que viene siendo secuencial, linea por linea, aca queda trabado en una repeticion durante x cantidad de veces
for (let i = 0; i < 5; i++) {
    console.log("Iteracion: ", i);
    // Al termino del codigo de este bucle, se produce el incremento
}

console.log("Mensaje posterior al bucle");
// Iteracion 0
// Iteracion 1
// Iteracion 2
// Iteracion 3
// Iteracion 4

/* Tabla de multiplicar del 10 con bucles for anidados

0 x 0 = 0
0 x 1 = 0

...

10 x 10 = 100
*/

// Arrancamos definiendo el primer bucle
for (let i = 0; i <= 10; i++) {
    // console.log("Iteracion: ", i);

    // Arrancamos definiendo el segundo bucle
    for (let j = 0; j <= 10; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }


    // Al terminar el bucle anidado, recien ahi, i se incrementa
}


// Tabla de multiplicar del 1 al 3
/*
1 x 1 = 1
1 x 2 = 2

...

3 x 3 = 9
*/

for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}

/*
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
*/


/*================
    while
==================

Ejecuta el bloque de codigo mientras la condicion sea verdadera

    while (condicion) {
        // Codigo a ejecutar mientras la condicion sea verdadera
    }
*/

let i = 0; // Inicializacion
while (i < 5) { // Condicion
    console.log("Iteracion while: ", i);
    i++; // Incremento
}


/*================
    do...while
==================

Es similar a while, pero la condicion se evaluea despues de ejecutar el bloque de codigo, garantizando que el codigo se ejecutara al menos una vez

    do {
        // Codigo a ejecutar
    }
    while (condicion);
*/

let contador = 0; // Inicializacion

do {
    console.log("Iteracion do...while: ", contador);
    contador++;

} while (contador < 5); // Condicion


/*==============================
    Control de flujo avanzado
==============================*/

// break: se usa para salir inmediatamente de un bucle o estructura de control 
for (let i = 0; i < 10; i++) {
    /*
    if (i === 5) {
        break;
    }
    */

    // Mismo resultado que arriba
    if (i === 5) break;
    console.log("Iteracion: ", i);
}


// continue: la instruccion continue salta a la siguiente iteracion del bucle, omitiendo el codigo restante dentro del bucle para esa iteracion
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue; // Salta todas las iteraciones donde i es par
    }

    console.log("Numero impar: ", i);
}



/*====================
    switch
======================

El switch es otra estructura de control que permite evaluar una expresion y ejecutar el bloque de codigo correspondiente al caso que coincide

Es especialmente util para evitar poner un monton de else if () { }

    switch (expresion) {
        case valor1:
            // Codigo que se ejecuta si la expresion es igual a valor1
            break;

        case valor2:
            // Codigo que se ejecuta si la expresion es igual a valor2
            break;

        default:
            // Codigo que se ejecuta si ninguno de los dos casos coincide
    }
*/

let diaSemana = parseInt(prompt("Dia de la semana"));

// Verificar que dia de la semana es
switch (diaSemana) {

    case 1: 
        console.log("Lunes");
        break;

    case 2: 
        console.log("Martes");
        break;

    case 3: 
        console.log("Miercoles");
        break;

    case 4: 
        console.log("Jueves");
        break;

    case 5: 
        console.log("Viernes");
        break;

    default:
        console.log("Fin de semana");

}
```

---

## JavaScript I / Conceptos elementales, sintaxis basica, variables, tipos de datos y operadores
#### [JavaScript Wikipedia](https://es.wikipedia.org/wiki/JavaScript)
#### [EcmaScript Wikipedia](https://es.wikipedia.org/wiki/ECMAScript)
```js
/*
¿Qué es JavaScript?
JavaScript es un lenguaje de programación utilizado principalmente para crear páginas y aplicaciones web interactivas y dinámicas.
Una página es interactiva cuando responder a las acciones del usuario.
Que una página sea dinámica significa que su contenido o estado puede cambiar.

Ejemplo:

Boton HTML agregar al carrito. (interactividad)

carrito: 0 Productos. 

pasa: 
carrito: 1 Productos.



Cuando desarrollemos una página web, normalmente trabajamos con tres tecnologías:

HTML ---> Define la estructura y contenido
CSS  ---> Define la apariencia y diseño
JS  ----> Define el comportamiento y la lógica


// Comentarios
// En linea

/* comentario
de multiples
lineas


**/

// console.log("Hola mundo");

/**
 DEFER nos va a permitir pegar la etiqueta <script> en el head.
 Le dice al navegador que descargue el archivo JS pero que lo ejecute cuando el HTML haya sido procesado.
*/


// alert('Hola mundo desde alert');

// Prompt nos permite solicitar datos al usuario mediante una ventana emergente.

// prompt('Escribí tu nombre');


// Introducción variables.
// Tres tipos de variables

// Mostramos un mensaje por consola
console.log("Hola mundo desde JavaScript"); // Usaremos console.log para mostrar mensajes por consola

// var: declaracion historica de variables, no recomendada y con limitaciones que veremos en JavaScript III
var nombre = "Federico";

// let: Introducido en EcmaScript 2015 (ES6). Permite declarar variables que pueden cambiar y tienen un alcance de bloque, por lo que mejora el control sonre donde y cuando se puede acceder a la variable
let edad = 25;
edad = 20; // let me permite reasignar un nuevo valor, pero no redeclarar con let edad = 30

// const: Introducido en ES6 tambien, permite declara variables que no se deben reasignar. El valor en un const debe ser constANTE, el valor igual puede ser modificado si es un objeto o un array, pero su referencia en memoria no puede cambiar
const pi = 3.1416;
// pi = 3; // Uncaught TypeError: Assignment to constant variable.
const array = []; // El array y el objeto son un tipo de objetos naturalmente mutables, pero JavaScript no considera que esto sea una reasignacion de datos
array.push(2);
console.log(array); // [2]
// array = []; // Uncaught TypeError: Assignment to constant variable. Falla cuando queremos hacer una reasignacion de valor

console.log(nombre); // Federico
console.log(edad); // 25
console.log(pi); // 3.1416


// Veremos en JavaScript III en profundidad las diferencias entre estas variables. Pero debemos usar let y const


/*===============================
    Tipos de datos primitivos
=================================

    - Numeros: Valores numericos
    - Cadenas o strings: Texto o caracteres encerrados entre '' o ""
    - Booleanos: true / false
    - null: Representa un valor intencionalmente vacio
    - undefined: Una variable declarada pero que no tiene valor
*/

let numero = 28;
let texto = "Septiembre";
let verdadero = true;
let vacio = null;
let indefinido = undefined;

// Todo lo que no son datos primitivos son objetos
console.log(numero); // 28
console.log(texto); // Septiembre
console.log(verdadero); // true
console.log(vacio); // null
console.log(indefinido); // undefined


/*================================
    Tipos de operadores en JS
==================================

Los operadores son simbolos especiales en JS que nos permiten realizar operaciones sobre valores o variables.
Estos operadores pueden ser aritmeticos, de comparacion, logicos, de asignacion, etc
https://www.w3schools.com/js/js_operators.asp

    - Operadores aritmeticos: Se usan para realizar operaciones matematicas sobre valores numericos
    https://www.w3schools.com/js/js_arithmetic.asp

    - Operadores de asignacion: Asignan valores a las variables. El operador mas comun es el = pero tambien hay operadores de asignacion compuesta
    https://www.w3schools.com/js/js_assignment.asp


    - Operadores de comparacion: Se usan para comparar valores y devuelven un resultado booleano (true o false)
    https://www.w3schools.com/js/js_comparisons.asp

        Diferencia entre == y ===

            - El operador == 
                - Igualdad simple
                - se refiere a la igualdad de valor
                - Compara los valores despues de hacer una conversion de tipo si es necesario

            - El operador === 
                - Igualdad estricta
                - se refiere a la igualdad de valor y tipo
                - Compara tanto el valor como el tipo SIN realizar parseo


    - Operadores logicos: Se utilizan par combinar expresiones booleanas

        &&      AND logico      x && y
        ||      OR logico       x || y
        !       NOT logico      !x
*/

// Comparamos los operadores para ver la diferencia
let x = 5;
let y = "5";

console.log(x == y); // true (compara solo el valor, realizando previamente un parseo)
console.log(x === y); // false (compara el valor y el tipo)


// Comparando operadores logicos
let a = true;
let b = false;

console.log(a && b);    // false (ambos deben ser true)
console.log(a || b);    // true (al menos uno es true)
console.log(!a);        // false (invierte el valor de a)

// Operador de tipo: Es un operador que me permite verificar el tipo de valor
// Con typeof obtengo el tipo de dato de una variable
console.log(typeof 42); // number
console.log(typeof "Holi"); // string
```