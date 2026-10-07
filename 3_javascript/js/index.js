/*=======================
    Callbacks
=========================

Los callbacks son funciones que se pasan como argumentos a otras funciones y se ejecutan despues de que ocurra algun evento o se complete alguna operacion*/

// Ejemplo basico de callback
function saludar(nombre, callback) {
    console.log(`Hola ${nombre}`);
    callback(); // Se ejecuta el callback
}

function despedirse() {
    console.log("Nos vemos!");
}

saludar("Esteban", despedirse);
// Hola Esteban
// Nos vemos!

// Ejemplo de callback con un temporizador
/*
setTimeout(() => {
    console.log("Esto se ejecuta en 2 segundos")
}, 2000);
*/


/*=========================================
    Funciones como First Class Citizens
===========================================

Por que es que esto se produce? 
En JavaScript, las funciones son "ciudadanas de primer clase", es decir, tiene prioridad y pueden ser

    - Asignadas a variables
    - Pasadas como argumentos
    - Retornadas desde otras funciones
*/


/////////////////////
// Asignar funcion a una variable
const miCallback = function() {
    console.log("Callback ejecutado");
}

// Pasamos esta funcion como argumento a otra funcion
function ejecutarCallback(callback) {
    callback(); // Aca invocamos a la funcion que pasamos por parametro
}

ejecutarCallback(miCallback); // Callback ejecutado


/////////////////////
// Sincronia vs Asincronia

// Callback sincrono
function procesoPesado(callback) {
    console.log("Iniciando proceso pesado...");

    // Simulamos un procesamiento que tarde unos segundos
    for (let i = 0; i < 5000; i++) {
        console.log("<- Vueltas de iteracion");
    }

    // Cuando termine este proceso pesado de arriba, llamara a la funcion
    callback(); // Aca imprimira "Proceso completado"
}

/*
procesoPesado(function() {
    console.log("Proceso completado");
});
*/

// Cuando ejecutamos el proceso pesado, JavaScript no permitira continuar ejecutando el codigo y mostrando este console.log() hasta que haya terminado el proceso pesado de arriba. Esto traba la ejecucion del codigo
console.log("Esto se ejecuta despues del callback");


////////////////////////
// Callback asincronico
function procesoAsincronico(callback) {
    console.log("Iniciando proceso asincrono...");

    // El temporizador como vimos arriba es una funcion asincrona, entonces no traba todo el flujo hasta que termine, corre en paralelo y no molesta
    setTimeout(function() {
        callback();
    }, 2000);
}

procesoAsincronico(() => console.log("Proceso asincronico completado"));

console.log("Fin del proceso asincronico");

console.log("Continuamos con el codigo");

// Aca sucede el proceso contrario, el codigo asincronico no se queda deteniendo todo 2 segundos, sino que corre en paralelo y el resto del codigo puede seguir ejecutandose sin problema

////////////////////////
// Casos de usos comunes de callbacks:

// 1. Temporizadores (Timers)
setTimeout(() => console.log("Esto se ejecuta despues de 3 segundos"), 3000);


// 2. Eventos del DOM
const boton = document.getElementById("boton");

boton.addEventListener("click", event => console.log("Boton clickeado ", event.target));


// 3. Operaciones con Arrays
const numeros = [1, 2, 3, 4, 5];

numeros.forEach(function(numero, indice) {
    console.log(`Indice: ${indice}, valor: ${numero}`);
});

/*
const duplicados = numeros.map(function(numero) {
    return numero * 2;
})
    */

const duplicados = numeros.map(num => num * 2);
console.log(duplicados); // [2, 4, 6, 8, 10]


// 4. Peticiones HTTP (mas adelante)


// Lectura de archivos (Node.js tambien mas adelante)


/*==========================
    Ventajas y Desventajas
============================

Ventajas
    - Simplicidad: Facil de entender para operaciones simples
    - Universalidad: Compatibilidad con todos los navegadores
    - Flexibilidad: Permiten crear codigo reutilizable

Desventajas
    - Callback Hell: Anidamiento excesivo que dificulta la lectura
    - Manejo de errores: Complicado con calbacks anidados
    - Flujo de control: Dificil de seguir con operaciones complejas


////////////////////////////
// Ejemplo de callback hell

// https://imgur.com/BtjZedW

function procesoCompleto(callback) {
    paso1(function(error, resultado1) {
        if (error) return callback(error);
            paso2(resultado1, function(error, resultado2) {
                if (error) return callback(error);
                    paso3(resultado2, function(error, resultado3) {
                    if (error) return callback(error);
                        paso4(resultado3, function(error, resultadoFinal) {
                            if (error) return callback(error);
                                callback(null, resultadoFinal);
                });
            });
        });
    });
}


///////////////////////////
// Alternativas modernas

Para evitar el callback hell (anidamiento excesivo), se desarrollaron alternativas como
    - Promesas: .then().catch()
    - Async/Await: Sintaxis mas limpia y legible

// Mismo ejemplo con async/await
async function procesoCompleto() {
    try {
        const resultado1 = await paso1();
        const resultado2 = await paso2(resultado1);
        const resultado3 = await paso3(resultado2);
        return resultadoFinal;
    
    } catch (error) {
        console.error("Error: ", error);
    }
}


Los callbacks son clave en JavaScript y se utilizan extensivamente para:

    - Manejar eventos del usuario
    - Operaciones asincronas
    - Temporizadores
    - Procesamiento de datos
    - Comunicacion con servidores

Aunque vayamos a usar promesas y async/await, entender los callbacks es fundamental para trabajar con JavaScript
*/

// TODO Callbacks vs High Order Functions, Destructuring, Spread Operator, Funciones anidadas, APIs en JavaScript y Web APIs