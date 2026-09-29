/*====================
    Scope / Ambito
======================

El scope, alcance o ambito se refiere al contexto en el cual las variables y las funciones son accesibles y pueden ser referenciadas.

Entender el scope es clave para que podamos escribir codigo claro y sin errores, tenemos distintos tipos de scope en JavaScript


    1. Global Scope o Ambito Global:
        - Las variables declaradas FUERA de cualquier funcion o bloque {} tienen alcance global y son accesibles desde cualquier parte del codigo. Esto incluye a var, let y const
        - En el caso de las viejas variables var, estas variables se adjuntan al objeto global window, pudiendo ser accesibles desde la consola


    2. Local Scope / Function Scope (Ambito local / Ambito de funcion)
        - Las variables declaradas DENTRO DE UNA FUNCION, solo son acesibles dentro de esa funcion


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


// Ejemplo de Local scope
function mostrarLocal() {
    var localVar = "Soy una variable local";
    console.log(localVar);
}

mostrarLocal(); // Soy una variable local
// console.log(localVar); // Uncaught ReferenceError: localVar is not defined


// Ejemplo de block scope
if (true) {
    let bloqueLet = "Soy una let de bloque";
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