const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProductForm");


function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
                <p class="mensaje error">${mensaje}</p>
            `;
}


// Al hacer click en Consultar, hacemos un callback asincrono para pegarle a http://localhost:3000/api/products/x
getProductForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitamos el envio por defecto del formulario

    // console.log(event.target);

    // Extraemos el valor del campo con id idProd
    const idProd = event.target.idProd.value.trim();
    console.log(idProd); // Vemos por consola el valor de id extraido del <form> para parsarselo a la url en el fetch


    if (!idProd) {
        return mostrarError("Ingresa un id valido");
    }


    try {
        const response = await fetch(`${urlBase}/api/products/${idProd}`);
        console.log(response);

        // Accemos al JSON dentro del cuerpo de la respuesta y lo convertimos a objeto JS
        const data = await response.json();

        // Procesamos respuestas 400 o 500
        if (!response.ok) {
            console.error(data.message);
            return mostrarError(data.message);
        }

        const producto = data.payload[0]; // Traigo el primer objeto de mi array (de 1 solo objeto)

        renderizarProducto(producto);

    } catch (error) {
        // Estos errores son errores REALES de red, no capturan 404, 500, etc
        console.error("Error al obtener productos: ", error);
        return mostrarError("Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    let htmlProducto = `
                <ul class="listados-container">
                    <li class="li-listados">
                        <img src="${producto.image}" alt="${producto.name}" class="img-listados">
                    </li>
                    <li class="li-listados">
                        Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong>
                    </li>
                </ul>
            `;

    contenedorProductos.innerHTML = htmlProducto;
}
