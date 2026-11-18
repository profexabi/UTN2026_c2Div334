// El archivo de barril importa todas las rutas (producto, usuarios, autenticacion) con un nombre y las exporta a todos los modulos. Centraliza las rutas y las exporta
import productRoutes from "./product.routes.js"; // Importamos las rutas de /api/products
import viewRoutes from "./view.routes.js"; // Importamos las rutas de las vistas
import authRoutes from "./auth.routes.js"; // Importamos las rutas de autenticacion
import userRoutes from "./user.routes.js";

// Exportamos todas nuestras rutas
export {
    productRoutes,
    viewRoutes,
    authRoutes,
    userRoutes
}