/*=======================
    Asincronia II
=========================

La asincronia es la capacidad de un programa de ejecutar tareas que toman tiempo (acceder a una API o esperar a un temporizador) SIN BLOQUEAR la ejecucion del resto del codigo

Esto es clave en JavaScripto porque es un lenguaje single-threaded (un solo hilo), lo que significa que solo puede ejecutar una tarea a la vez. Por eso, para evitar que el hilo principal se bloquee, se introducen mecanismos asincronicos que permiten "delegar" operaciones que tomaran tiempo y continuar ejecutando el resto del codigo mientras esas tareas se completan

EXTRA -> Call stack, Task queue y Event Loop

JavaScript nos aporta ciertas herramientas para la asincronia


/////////////////
// 1. Callbacks: Funcion que se pasa como argumento para ejecutarse despues de completar una operacion
    function procesoAsincronico(callback) {
        console.log("Iniciando proceso asincrono...");

        // El temporizador como vimos arriba es una funcion asincrona, entonces no traba todo el flujo hasta que termine, corre en paralelo y no molesta
        setTimeout(function () {
            callback();
        }, 2000);
    }


/////////////////
// 2. Promises: Las Promesas son objetos que representan un valor que puede estar disponible ahora, en el futuro, o nunca. Tiene un serie de estados
    - Pending: Pendiente (Se esta realizando la conexion con la BBDD)
    - Fulfilled: Completo (Se realizo exitosamente la conexion a la BBDD)
    - Rejected: Rechazado (Fallo la conexion a la BBDD)


Para trabajar con promesas, nos metemos con la Web API fetch que devuelve una promesa

    // Con fetch puedo realizar una peticion HTTP GET para traer la info de esta url

    // 1. Realizo la peticion a la URL
    fetch("https://jsonplaceholder.typicode.com/users")
        
        // 2. Cuando termine de recibir (exitosamente) esta peticion, parseo el JSON
        .then(res => res.json()) 

        // 3. Si el parseo se realiza exitosamente, directamente trabajo con los datos
        .then(data => {
            // Ahora puedo hacer de todo con esta informacion ya parseada en mi codigo
            console.table(data); // Entre otras operaciones que se me ocurran    
        })

        // En el caso de un error en alguno de los 3 pasos anteriores, lo capturo y lo veo por consola
        .catch(error => console.error(error));

En el caso anterior
    1. fetch hace una peticion HTTP para obtener un recurso
    2. fetch DEVUELVE una promesa que:
        - Se resuelve con una response (respuesta del servidor)
        - O se rechaza si hay un error


Diferencia conceptual entre Promises y fetch

fetch: 
    - Es una funcion web API (para hacer peticiones HTTP)
    - Devuelve una promesa
    - Siempre trabaja de forma asincronica
    - fetch usa promesa como mecanismo de manejo asincronico

promesa:
    - Es un objeto nativo de JS para manejar resultados asincronicos
    - Es el resultado que devuelve fetch
    - Devuelve un valor (exito o error futuro)


========================
    fetch()
=========================

fetch() es una funcion nativo en los navegadores modernos que nos permite realizar peticiones HTTP de forma asincronica usando promesas

Forma parte de las Web APIs proporcionadas por el navegador. Vino a reemplazar al viejo y complejo metodo XMLHttpRequest

Recordemos que una API es un conjunto de funciones o herramientas para interactuar con algo, las Web APIs son herramientas y funciones que el navegador nos entrega para interatuar con el y poder hacer multiples operaciones que no podemos hacer con el lenguaje JS com tal

Con fetch podremos realizar peticiones HTTP para obtener recursos de una URL (tambien crear, modificar o eliminar recursos)

- Devuelve un objeto Promise que se resuelve con un objeto Response
- Usa el estandar HTTP: metodos como GET, POST, PUT DETE
- Funciona bien con asnyc/await
- Es mas limpiar y moderna que XMLHttpRequest
- Soporta CORS, headers, envio de JSON y mas

///////////////////
// Sintaxis basica

    fetch (url, options)
        .then(response => {
            // Respuesta cruda del servidor    
        })

        .catch(error => {
            // Error de red o fallo total    
        })

Parametros:
- url: string (La URL a la que queremos hacer una solicitud)
- options: (opcional), objeto que especifica configuracion adicional como metodo HTTP, headers, body
*/

const contenedorDatos = document.getElementById("contenedorDatos");


// Realizo una peticion HTTP GET a la URL para obtener los usuarios que me ofrece este endpoint (url)
fetch("https://jsonplaceholder.typicode.com/users") // Se realiza la solicitud de red

    // Necesito esperar a que haya terminado la conexion de red
    .then(response => {
        console.log(response); // Aca veo la respuesta HTTP del servidor
        return response.json(); // Parseo el contenido del cuerpo de la respuesta del servidor
    })
    // Necesito esperar a que se produzca el parseo de informacion y tenga los datos en el objeto data
    .then(data => {
        console.table(data); // Compruebo por consola que recibo correctamente los datos de la URL

        let htmlUsuarios = "<ul>";

        data.forEach(user => {
            htmlUsuarios += `<li>Nombre: ${user.name} / Email: ${user.email}</li>`;
        });

        htmlUsuarios += "</ul>";

        console.log(htmlUsuarios); // Ya con todo el HTML armado adentro de este string, lo renderizo

        contenedorDatos.innerHTML = htmlUsuarios
    })
    // En caso de algun problema al realizarse la conexion de red o el parseo de datos, lo capturo aca y lo muestro por consola
    .catch(error => {
        console.log(error);
    });


/*==================
    Response
====================

El objeto Response provee la siguiente informacion

    .ok: Booleano, nos da true si el status esta entre 200 y 299
    .status: Codigo HTTP (200, 404, 500, etc)
    .statusText: Texto del estado (OK, Not Found, Internal Server Error, etc)
    .headers: Cabeceras HTTP de la respuesta
    .json(), .text(), .blob(), .formData() para leer el contenido de la respuesta


==========================
    Manejo de errores
=========================

- fetch() solo rechaza la promesa en errores de red reales (sin internet, servidor caido)
- NO rechaza en codigos de error HTTP (404, o 500), por eso debemos revisar con response.ok
*/

// TODO: Continuar desde pag 8/17 Uso con aync/await