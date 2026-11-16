const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProductForm");
const createProductForm = document.getElementById("createProductForm");


// Optimizacion: Validacion previa de los datos en el cliente
function validarFormulario(data) {
    const errores = [];

    if (!data.name || !data.price || !data.image || !data.category) {
        errores.push("Faltan campos requeridos");
    }

    if (data.name.length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (data.price < 0) {
        errores.push("El precio debe ser un numero entero mayor a 0");
    }

    return errores;
}


function mostrarMensaje(tipo, mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje ${tipo}">${mensaje}</p>
    `;
}

function mostrarListaErrores(array) {
    let htmlErrores = "";
    array.forEach(error => {
        htmlErrores += `<p class="mensaje error">${error}</p>`
    });

    contenedorProductos.innerHTML = htmlErrores;
}


createProductForm.addEventListener("submit", async event => {

    event.preventDefault(); // Evitamos el envio por defecto del <form>

    // Obtenemos todo el contenido del <form> en un objeto FormData
    const formData = new FormData(event.target);
    console.log(formData);
    // FormData(4) { category → "drink", image → "urlcualca", name → "Fernet Chabona", price → "12345" }

    // Creamos un objeto literal de JavaScript para poder parsearlo en JSON y meterlo en el cuerpo de la peticion HTTP
    const formObj = Object.fromEntries(formData.entries());
    console.log(formObj);
    // {category: 'food', image: 'https://comedera.com/wp-content/uploads/sites/9/20…08/Chipa.jpg?fit=150,125&crop=0px,0px,150px,150px', name: 'Cono de papas fritas', price: '12345'}

    // Optimizacion, parseamos algunos valores del formObj
    formObj.price = Number(formObj.price); // mandamos price como numero
    formObj.name = formObj.name.trim(); // Limpiamos de espacios el campo nombre

    // Con estos datos mas limpios, los paso a la funcion validadora del cliente
    const errores = validarFormulario(formObj);

    // Verificamos que no haya datos erroneos antes de mandar nada al servidor
    if (errores.length > 0) {
        console.error(errores);
        return mostrarListaErrores(errores)
    };

    // Este es el contenido que ira en el body de la request
    console.log(JSON.stringify(formObj));
    // {"category":"food","image":"https://comedera.com/wp-content/uploads/sites/9/2023/08/Chipa.jpg?fit=150,125&crop=0px,0px,150px,150px","name":"Cono de papas fritas","price":"12345"}


    try {
        const response = await fetch(`${urlBase}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObj)
        });

        console.log(response);

        const data = await response.json(); // Ahora podre acceder al contenido de la respuesta

        if (!response.ok) {
            if (data.listaErrores) {
                return mostrarListaErrores(data.listaErrores);
            }

            return mostrarMensaje("error", data.message);
        }

        let mensaje = `${data.message} con id ${data.productId}`;
        console.log(mensaje);
        mostrarMensaje("exito", mensaje);

    } catch (error) {
        // Estos errores son errores REALES de red, no capturan 404, 500, etc
        console.error("Error al obtener productos: ", error);
        return mostrarMensaje("error", "Error de conexion con el servidor");
    }
});