# Apuntes de CSS

- [Ideas de paginas super facheras](https://fireart.studio/blog/20-best-futuristic-website-examples-to-inspire-you/)

## Fuentes externas
- [Fuentes futuristas](https://www.magnific.com/search?format=search&last_filter=query&last_value=future+font&query=future+font#uuid=e9654f8d-ded1-4cc2-b356-783a55da32b6)
- [Fuentes 8 bit](https://www.fontspace.com/category/8-bit)

## Consejos generales

#### *La altura es secundaria muchas veces!*
1. Antes de estilar, encarguemonos de llenar la pagina con todo el contenido (volcar todo el HTML)
2. Preocupemonos principalmente del ancho, (la altura debe estar condicionada por el tamaño de los contenidos además del box model)
3. Ajustar el box model (lo que falta de altura lo resolvemos aca en la mayoria de los casos)
4. Opcional, solo en ciertos casos o necesidades, ajustar la altura 

#### Orden ideal para empezar a armar una pagina web
1. Creamos la estructura de la pagina con los contenedores semanticos
2. Creamos los subcontenedores
3. Empezamos a colocar dentro de estos contenedores HTML los contenidos (parrafos, titulos, imagenes, etc)

4. Ajustamos los tamaños de los elementos principales (priorizando las uds relativas)
5. Maquetamos con flex
6. Terminamos de ajustar todo con media queries

---

## [Colores de CSS](https://www.w3schools.com/css/css_colors.asp)
- Priorizaremos siempre los valores hexadecimales o los rgba para transparencias
- [140 nombres de colores CSS](https://www.w3schools.com/colors/colors_names.asp)

---

## Unidades absolutas y relativas
Las unidades de medida en CSS se utilizan para definir el tamaño, espacio, márgenes, bordes, fuentes y otros aspectos visuales de los elementos. 
Estas unidades pueden ser absolutas o relativas dependiendo de si su tamaño es fijo o si se ajusta en funcion de otros factores como el tamaño de ventana o del elemento padre

### Unidades absolutas en CSS
1. **`px` (pixeles)**
- El pixel es la unidad mas comun en el diseño web. Es una medida fija que representa un solo punto en la pantalla
- Se usa principalmente para tamaños de fuente, margenes, bordes, etc

```css
p {
    font-size: 16px;
}
```

---

### Unidades relativas en CSS
Dependen de otros valores como el tamaño del elemento padre o las dimensiones de la ventana del navegador. *Estas unidades son esenciales para crear diseños adaptativos y responsivos*

1. **`em`** (usaremos mayoritariamente el `rem`)
- `em` es una unidad relativa al tamaño de la fuente del elemento padre. Si un elemento tiene una fuente de 16px, 1em sera 16px (2em sera 32px)
- Muy comun para fuentes y espaciados
- Se escala bien en diseños responsivos

```css
p {
    font-size: 1.5em; /* Equivalente a x 1.5 */
}
```

2. **`rem` (root em)**
- Similar a `em` pero siempre se refiere al tamaño de la fuente del elemento raiz `html`, en lugar del tamaño de fuente del elemento padre
- Esto favorece los diseños responsivos porque se mantiene consistente sin depender de la cascada de estilos

```css
p {
    font-size: 2rem; /* Equivalente a x2 */
}
```

3. **`%` (porcentajes)**
- Los porcentajes se calculan en relacion con el tamaño del contenedor padre
- Muy utilizado para ajustar el ancho de elementos en layouts flexibles

```css
div {
    width: 50%;
}
```

4. **`vw` (viewport width / ancho del puerto visual)**
- `vw` representa el 1% del ancho de la ventana grafica (viewport). Por ejemplo si el viewport tiene 1000px de ancho, 1vw sera igual a 10px
- Se usa para hacer que los elementos escalen en funcion del ancho de la ventana

```css
div {
    width: 50vw; /* Ocupara el 50% del ancho de la ventana */
}
```

5. **`vh` (viewport height / alto del puerto visual)**
- Similar a `vw` pero basado en el alto de la ventana grafica. `1vh` es igual al 1% de la altura del viewport

```css
div {
    height: 100vh; /* Ocupa el 100% de la altura de la ventana */
}
```

---

#### Resumen, cuando usar uds absolutas y cuando relativas?

- **Unidades absolutas**: `px` son utiles cuando necesitamos un tamaño fijo, principalmente en impresiones o cuando no nos importa la flexibilidad del diseño

- **Unidades relativas**: (`rem`, `%`) Deberiamos usarlas siempre, son preferibles para diseños responsivos y adaptativos, ya que se ajustan en función del contenedor o la ventana gráfica, por lo que mejora la experiencia de usuario en diferenes dispositivos y tamaños de pantalla


---

## Combinadores
Los combinadores en CSS son caracteres que permiten seleccionar elementos en funcion de su relacion con otros elementos en el arbol del DOM. Estos combinadores definen la forma en que se conectan los selectores y como se relacionan los elementos entre si

#### Fundamentales (usados en el 95% de los casos)

1. **Combinador descendiente** ` `
Consiste en un espacio en blanco, selecciona **todos los elementos que son descendientes** de un elemento padre sin importar que tan profundo esten en el [DOM](https://www.w3schools.com/whatis/whatis_htmldom.asp)
```css
padre hijo {
    /* Estilos */
}

/* Apunto a todos los parrafos dentro de un div */
div p {
    color: blue;
}

```

2. **Combinador de hijo directo** `>`
Consiste en el caracter `>` que selecciona solo los elementos que son **hijos inmediatos** de un elemento padre
```css
padre > hijo {
    /* Estilos */
}

div > p {
    color: red;
}
```

#### Extra (usados pocas veces)

3. **Combinador de hermano adyacente** `+`
Este combinador selecciona un elemento que es **hermano inmediato** de otro elemento, es decir, el que aparece justo despues de el en el mismo nivel del DOM

```css
elemento1 + elemento2 {
    /* Estilos */
}

h1 + p {
    color: green;
}
```

4. **Combinador de hermano general** `~`
Selecciona todos los elementos **hermanos** de un elemento (no necesariamente adyacentes). Simplemente deben compartir el mismo padre

```css
elemento1 ~ elemento2 {
    /* Estilos */
}

h1 ~ p {
    color: purple;
}
```

---

## Pseudoclases
Las pseudoclases en CSS son palabras clave que se añaden a los selectores para especificar un estado especial de un elemento.
Permiten aplicar estilos a elementos bajo ciertas condiciones o estados sin tener que modificar el HTML (interactuar con un enlace, seleccionar primer o ultimo elemento de una tabla, etc)

#### Sintaxis basica
```css
selector:pseudoclase {
    /* estilos */
}
```

#### Pseudoclases de interaccion de usuario
Hay varios tipos de pseudoclases, pero las que mas usamos son las de interaccion de usuario. Estas pseudoclases son utiles para controlar el estilo de los elementos cuando el usuario interactua con ellos

- `:hover`: Se activa cuando el usuario pasa el cursor sobre un elemento
- `:active`: Se aplica cuando el usuario esta haciendo click en un elemento como un boton o enlace
- `:focus`: Se activa cuando un elemento como un input esta en foco (cuando el usuario puede interactuar con el)
- `:visited`: Se aplica a enlaces `<a>` que ya fueron visitados previamente por el usuario

Las pseudoclases tambien pueden combinarse entre si
```css
/* Aplicamos un estilos a todos los enlaces ya visitados a los que le pongamos el mouse arriba */
a:visited:hover{
    color: orange;
}
```


#### Pseudoclases de estado estructural
- [Muy usadas en tablas](https://www.w3schools.com/css/tryit.asp?filename=trycss_table_fancy)

```css
/* Esta es la pseudoclase mas usada */
/* Color mas oscuro de fondo a todas las filas pares */
tr:nth-child(even){background-color: #f2f2f2;}

/* A los ultimos table data <td> les damos un color verde */
td:last-child {
	color: #04AA6D;
}

/* Cada fila se oscurece al pasar el mouse */
tr:hover {
	background-color: #ddd;
    cursor: pointer;
}
```


#### Pseudoclases de estado logico
Se aplican en base a ciertos estados logicos o condicionales del elemento
```css
/* Apuntamos a todos los elementos seleccionados de un checkbox */
input[type="checkbox"]:checked {
    background-color: green;
}

/* Color rojo a todos los input desabilitados */
input:disabled {
    color: red;
}
```