/*======================
    Middlewares
======================*/

// Middleware logger para analizar por consola todas las solicitudes
const loggerUrl = (req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next(); // Damos paso al siguiente middleware o a procesar la response
};


// Middleware de ruta para filtrar ids no validos
const validateId = (req, res, next) => {
    const id = Number(req.params.id); // Convierto a numero el valor pasado en el parametro

    // Si el numero no es un entero o es  <= 0
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El id debe ser un numero entero positivo"
        });
    }

    req.id = id;
    next(); // Damos paso al siguiente middleware o a la respuesta
}



// Middleware de ruta para validar los campos de un formulario
const validateProduct = (req, res, next) => {
    const categoriasValidas = ["food", "drink"];
    const errores = []; // Array vacio de errores

    // Recogemos los datos del body
    const { name, image, price, category } = req.body;

    // Verificamos los datos de entrada
    if (!name || !image || !price || !category) {
        errores.push("Faltan campos requeridos");
    }

    // Verificamos el campo name
    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos dos caracteres");
    }

    // Verificamos el campo precio
    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    // El campo image no lo verificamos porque despues aplicaremos Multer

    // Verificamos el campo category
    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida")
    }

    // Si existe algun error en nuestro array, devolveremos estos en un 400
    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next(); // Sin el next la peticion HTTP queda colgada porque nunca da paso al siguiente middleware o a la respuesta
}


// Exportamos nuestros middlewares para llevarlos a otros modulos
export {
    loggerUrl,
    validateId,
    validateProduct
}