# Que es el objeto `FormData`?

`FormData` es una API nativa de JavaScript que permite recopilar y manejar los datos de un formulario HTML (`<form>`) para enviarlos a un servidor.

No es una librería externa ni algo que tengas que instalar. Viene incorporada en los navegadores web como parte de las Web APIs.

## ¿De dónde viene?

`FormData` forma parte de las Web APIs del navegador, específicamente de la API de XMLHttpRequest, aunque también se utiliza con `fetch()`.

Está disponible globalmente en JavaScript:

javascript

```javascript
const formData = new FormData();
```

No necesitás importarlo.

## ¿Cómo se utiliza?

Imaginemos que tenemos este formulario HTML:

HTMLAjustar líneasCopiar códigoVista previa

```html
<form id="miFormulario">
  <input type="text" name="nombre" value="Juan">
  <input type="email" name="email" value="juan@gmail.com">

  <button type="submit">Enviar</button>
</form>
```

Podemos obtener sus datos así:

javascript

```javascript
const formulario = document.querySelector("#miFormulario");

const formData = new FormData(formulario);
```

¡Y listo\! `FormData` recopila los campos del formulario que tienen atributo `name`.

## ¿Qué podemos hacer con FormData?

1. Obtener valores:

javascript

```javascript
formData.get("nombre"); // "Juan"
formData.get("email");  // "juan@gmail.com"
```

2. Agregar datos:

javascript

```javascript
formData.append("edad", "25");
```

3. Modificar datos:

javascript

```javascript
formData.set("nombre", "Pedro");
```

4. Recorrer todos los datos:

javascript

```javascript
for (const [clave, valor] of formData) {
  console.log(clave, valor);
}
```

## ¿Cómo se envía al servidor?

Una de sus funcionalidades más útiles es trabajar con `fetch()`:

javascript

```javascript
const formulario = document.querySelector("#miFormulario");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formulario);

  const respuesta = await fetch("/api/usuarios", {
    method: "POST",
    body: formData
  });

  const resultado = await respuesta.json();

  console.log(resultado);
});
```

Una ventaja importante es que el navegador se encarga de generar automáticamente el `Content-Type` adecuado, incluyendo el boundary cuando utiliza `multipart/form-data`.

## En resumen

- FormData: API nativa de JavaScript para manejar datos de formularios.
- Origen: Web APIs del navegador.
- Instalación: No necesita ninguna.
- Uso: Recopilar, agregar, modificar y enviar datos.
- Compatible con: `fetch()` y `XMLHttpRequest`.

Un detalle importante: `FormData` no es lo mismo que un objeto común de JavaScript (`{}`). Está especialmente diseñado para manejar datos de formularios, incluidos archivos e imágenes.

Si estás aprendiendo JavaScript, entender `FormData` te va a servir muchísimo para trabajar con formularios, peticiones HTTP y APIs.
