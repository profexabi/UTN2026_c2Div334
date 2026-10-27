-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 24-06-2026 a las 11:07:32
-- Versión del servidor: 8.0.46-0ubuntu0.22.04.3
-- Versión de PHP: 8.1.2-1ubuntu2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp25_autoservicio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` enum('food','drink') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`, `active`) VALUES
(1, 'la gran Diego', 'https://www.mostazaweb.com.ar/wp-content/uploads/2026/03/MAY0-3-copia.png', 'food', '200.00', 1),
(3, 'la macpollo', 'https://www.mostazaweb.com.ar/wp-content/uploads/2025/05/MAYMesa-de-trabajo-2.png', 'food', '199.00', 1),
(5, 'coca cola', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.EpJmmw7A2SEBQUnvwLyEpQAAAA%26pid%3DApi&f=1&ipt=73b0c59fdbff0f45f150ae99ac60b1aad8170f26bf80c667f03b21838a019716', 'drink', '250.00', 1),
(6, 'pepsi', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Feborong.com.my%2Fwp-content%2Fuploads%2F2019%2F03%2Fpepsi_320ml.jpg&f=1&nofb=1&ipt=57aa4788a4a61691e814f6b1c4452742e8c4bedd3b233c3fb18df4b1bd940f74', 'drink', '250.00', 1),
(15, 'Manaos cola', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.rappi.com.ar%2Fproducts%2F1632183888884_1632183886424.jpg%3Fe%3Dwebp%26d%3D900x750%26q%3D30&f=1&nofb=1&ipt=dc339bc39652e7fe34e76bb376f8d03eba12a5926ef439d241c21d8343dc0a85', 'drink', '150.00', 1),
(22, 'pizza con champis', 'https://images.all-free-download.com/images/graphiclarge/pizza_hd_picture_5_167275.jpg', 'food', '800.00', 1),
(23, 'faina verdeo', 'https://as2.ftcdn.net/v2/jpg/00/51/63/03/1000_F_51630306_aA6355B1fDV63L73jqBnsJjoZAbzkYLA.jpg', 'food', '250.00', 1),
(26, 'empanada de zorza', 'https://lacasabodega.com/repository/2020/01/empanada_gallega_tradicional_atun-450x300.jpg', 'food', '1400.00', 1),
(27, 'empanada de pulpo', 'https://www.frutasnievesonline.com/3110-home_default/empanada-de-pulpo-compra-online.jpg', 'food', '2500.00', 1),
(28, 'fernet buhero negro', 'https://canillalibre.uy/wp-content/uploads/2023/05/buhero-fernet.png', 'drink', '7000.00', 1),
(29, 'fernet vittone', 'https://jumboargentina.vtexassets.com/arquivos/ids/585065-150-150?v=637251960119570000&width=150&height=150&aspect=true', 'drink', '4000.00', 1),
(31, 'Inka Cola', 'https://http2.mlstatic.com/D_Q_NP_713503-MLA74946000100_032024-R.webp', 'drink', '300.00', 1),
(32, 'Manaos Pomelo', 'https://http2.mlstatic.com/D_Q_NP_2X_862439-MLA99406384700_112025-R.webp', 'drink', '200.00', 1),
(33, 'Arepas con queso', 'https://arepasdelgringo.com/wp-content/uploads/2015/02/arepas_with_cheese_recipe1-150x150.jpg', 'food', '400.00', 1),
(34, 'Fugazzetta rellena', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.CjJQpCQfBovsvzkuOnKXegAAAA%3Fpid%3DApi&f=1&ipt=839c03a2aacf9b3cc448cfb94eee75f904ef534ff9db334df1dceef8edf5adc3', 'food', '1500.00', 1),
(35, 'Tequenos', 'https://media.istockphoto.com/id/1345302016/photo/latin_american-teque%C3%B1os.jpg?s=612x612&w=0&k=20&c=acPut25DCtDyvCxmYnoK1O-d1eK7M_6LrZy7mE2ovYs=', 'food', '800.00', 1),
(36, 'Soda sifon', 'https://www.distribuidoralaflia.com.ar/wp-content/uploads/2020/12/SODA-CORDOBA-SIFON-X-2LT.jpeg', 'drink', '200.00', 1),
(37, 'Vino Toro tinto', 'https://http2.mlstatic.com/D_Q_NP_2X_718640-MLA99366550934_112025-R.webp', 'drink', '100.00', 1),
(38, 'Vino Toro blanco', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.TKtPn5W0qYODKqta-rcOXgAAAA%3Fpid%3DApi&f=1&ipt=3f35d937311d43002218040fd368fa9c9e1d9b98356c9535036b280b05047a78&ipo=images', 'drink', '100.00', 1),
(41, 'Fernetazo Chabona', 'https://pointlaventanita.com/wp-content/uploads/2024/05/chabona.webp', 'drink', '2300.00', 1),
(44, 'Fernet Branca', 'https://http2.mlstatic.com/D_Q_NP_2X_685551-MLA99433693010_112025-E.webp', 'drink', '17000.00', 1),
(45, 'Fernet Buhero Pomelo Rosado', 'https://musters.com.ar/wp-content/uploads/2025/11/FERNET-BUHERO-NEGRO-MANDELO.jpeg', 'drink', '8000.00', 1),
(46, 'Fernet cola Fercho', 'https://maxiconsumo.com/media/catalog/product/cache/dee42de555cd0e5c071d2951391ded3b/2/8/28857_177164555769992a758c7d74.40112663.jpg', 'drink', '800.00', 1),
(47, 'Fernet Cola Fernandito', 'https://supercristian.com.ar/wp-content/uploads/2020/09/915959.jpg', 'drink', '400.00', 1),
(48, 'Milanesa con pure', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcomoquiero-uploads.s3-accelerate.amazonaws.com%2Fimages%2Frecipes%2F6348.webp&f=1&nofb=1&ipt=b5ddc310e8f55d56e45b50cd5d36060579357952f993b359785aa40496b7b8cd', 'food', '400.00', 1),
(50, 'Muzza UGIs', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F11%2Fe1%2Fd0%2Fd7%2Fnos-comimos-dos.jpg&f=1&nofb=1&ipt=c12b9b00c8c0af4c47d4aad64776175f81981c41cd4af129654ba7e7e418befc', 'food', '200.00', 1),
(57, 'Diosa tropical', 'https://pbs.twimg.com/media/HGoco64WMAA8GH0.jpg', 'drink', '200.00', 1),
(58, 'Gaseosa Trompis', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F23%2Fc9%2Fcc%2F23c9cc7313eaea4e7da350317540b5f7.jpg&f=1&nofb=1&ipt=32ca11984d73d531e386698a7569553f4bff88aff6a613e546fda67b2ab52686', 'drink', '100.00', 1),
(59, 'Gaseosa Bichy', 'https://carrefourar.vtexassets.com/arquivos/ids/191417-1600-auto?v=637511789380170000&width=1600&height=auto&aspect=true', 'drink', '100.00', 1),
(62, 'Amargo Obrero', 'https://cdn.shopify.com/s/files/1/0562/8008/8751/files/Amargoobrero_480x480.jpg?v=1713472802', 'drink', '4000.00', 1),
(63, 'Estrella Galicia', 'https://sectorhostelero.com/2988-large_default/estrella-galicia-tercio-33cl-.webp', 'drink', '1000.00', 1),
(65, 'Fernet cola 1882', 'https://arjosimarprod.vtexassets.com/arquivos/ids/161687-1200-auto?v=637433146966630000&width=1200&height=auto&aspect=true', 'drink', '1882.00', 1),
(66, 'Fernet cola 3', 'https://supercristian.com.ar/wp-content/uploads/2020/09/915959.jpg', 'drink', '600.00', 1),
(67, 'Paso de los toros pomelo', 'https://cdn11.bigcommerce.com/s-3stx4pub31/images/stencil/1280x1280/products/7656/21865/590180__11417__74481.1668601638.jpg?c=3?imbypass=on', 'drink', '800.00', 1),
(68, 'Jugo Baggio naranja', 'https://admin.plantheoshops.com.ar/imagenes/3/5fb3af3ae5073_1605611322-9381.jpeg', 'drink', '600.00', 1),
(69, 'Jugo Baggio manzana', 'https://maxi.tiendamitre.com.ar/6803-large_default/Array.jpg', 'drink', '700.00', 1),
(71, 'Sprite chica', 'https://cf.degustabox.com/it/public/images/1528904273_11_-_Sprite.png', 'food', '300.00', 1),
(73, 'Terrible pastel de papa', 'https://www.rionegro.com.ar/wp-content/uploads/2019/06/thumb025.jpg?w=920&h=517&crop=1', 'food', '50.00', 1),
(76, 'El Choriflan', 'https://imgs.search.brave.com/VoH7iRKRmSACdRPpnJJpZ6MuDFo52Fu4sNZX2RbUXt0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2luYXBzaXMuYWdl/bmN5L3VwbG9hZHMv/aW1hZ2VzLzIwMjYv/MDEvNjk3NWYxYTcw/N2ZiY18zZTJlOGEx/Ni5qcGc', 'food', '100.00', 1),
(77, 'Empanada de humita', 'https://www.sneakyveg.com/wp-content/uploads/2016/01/humita-empanada-sweetcorn-sneaky-veg-6-683x1024.jpg', 'food', '60.00', 1),
(78, 'Ñoquis', 'https://img.minutoneuquen.com/O3y5dEyXGTiAP6aLYVuUWBRCNAQPGyZg_AwfYgPyHa4/rs:fit:2000:2000:0/aHR0cHM6Ly9hc3NldHMubWludXRvbmV1cXVlbi5jb20vZm90b2dyYWZpYXMvMjAyMy8zLzI4LzU5NTM4Mi5qcGVn', 'food', '500.00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_sales`
--

CREATE TABLE `product_sales` (
  `product_id` int NOT NULL,
  `sale_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `product_sales`
--

INSERT INTO `product_sales` (`product_id`, `sale_id`) VALUES
(5, 1),
(22, 5),
(26, 2),
(27, 2),
(28, 2),
(32, 5),
(36, 4),
(37, 4),
(44, 3),
(45, 3),
(46, 3),
(47, 5),
(48, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(10,2) NOT NULL,
  `user_name` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `date`, `total_price`, `user_name`) VALUES
(1, '2025-12-03 15:46:37', '3700.00', 'Fran'),
(2, '2025-12-17 18:03:55', '10900.00', 'xabi'),
(3, '2026-06-10 14:03:32', '25800.00', 'Lautaro'),
(4, '2026-06-11 12:04:51', '700.00', 'Gonzalo'),
(5, '2026-06-11 12:18:37', '1950.00', 'Kevin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Johnny', 'johnny@melavo.com', 'melavo'),
(2, 'Johnny Knoxville', 'johnny@knoxville.com', 'knoxville'),
(3, 'Bam Margera', 'bam@margera.com', 'margera'),
(4, 'coso', 'coso@coso.com', 'coso'),
(5, 'Jose Maria', 'jose@maria.com', 'jose'),
(6, 'Pepe Argento', 'pepe@argento.com.ar', 'pepe'),
(7, 'test', 'test@test.com', 'test'),
(8, 'Rusa', 'rusa@rusa.com', '123'),
(9, 'elbarto', 'el@barto.com', 'elbarto'),
(10, 'uno', 'uno@uno.com', '$2b$10$ScA2GLrUcopmXa3OLxTqGemQ/DuYpS1fDomc1LRgArJCLaF22Okx6'),
(11, 'pedro', 'pe@dro.com', '$2b$10$Zma8h06soNQZbr1tjx0FtueQ.G/H5iu6IwqrhtaiwIuOYa80pLl6q'),
(12, 'Bob Patino', 'bob@patino.com', 'bob'),
(13, 'merlin', 'mer@lin.com', 'merlin'),
(14, 'thiago', 'thi@ago.com', '$2b$10$wemYF.qxnldHTJnMdxNcQeUBqZHz.FhqUBEmmCCcp/ODZTjq7E3yi');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_sales`
--
ALTER TABLE `product_sales`
  ADD KEY `product_id` (`product_id`,`sale_id`),
  ADD KEY `sale_id` (`sale_id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product_sales`
--
ALTER TABLE `product_sales`
  ADD CONSTRAINT `product_sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_sales_ibfk_2` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
