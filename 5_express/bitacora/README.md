# Utilizando `node --watch`
`node --watch` es una función integrada en Node.js que permite reiniciar automáticamente tu aplicación cuando detecta cambios en los archivos, sin necesidad de instalar `nodemon`.

Es decir, podés usarlo como alternativa a `nodemon` para desarrollar tu aplicación.

## ¿Cómo funciona?

1. Modificás tu código

Por ejemplo, guardás un cambio en `server.js`.

2. Node.js detecta el cambio

Supervisa los archivos y detecta modificaciones.

3. Reinicia la aplicación

Vuelve a ejecutar el programa automáticamente.

## 1. Cómo usarlo

Supongamos que tenés un archivo `server.js`:

js
```
console.log("Servidor iniciado");
```

En lugar de ejecutar:

bash
```
node server.js
```

Ejecutá:

bash
```
node --watch server.js
```

Cuando modifiques y guardes `server.js`, Node.js reiniciará el proceso automáticamente.

Para detenerlo, presioná `Ctrl + C`.

## 2. ¿Necesito instalar algo?

No. `--watch` viene integrado en Node.js en las versiones modernas que lo admiten. Está disponible de forma estable desde Node.js 20.13.0 y 22.0.0.

Podés verificar tu versión con:

bash
```
node -v
```

## 3. `node --watch` vs. `nodemon`

| Característica | `node --watch` | `nodemon` |
| --- | --- | --- |
| Instalación adicional | No | Sí |
| Reinicio automático | Sí | Sí |
| Dependencias adicionales | No | Sí |
| Configuración avanzada | Más limitada | Más opciones |
| Exclusión de archivos y patrones personalizados | Más limitada | Más flexible |

## 4. ¿Cómo usarlo en un proyecto con npm?

Si tu `package.json` tiene este contenido:

json
```
{
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  }
}
```

Podés iniciar el servidor en modo desarrollo con:

bash
```
npm run dev
```

Y para ejecutarlo normalmente, sin supervisión de cambios:

bash
```
npm start
```

Mi recomendación: si estás empezando con Node.js o desarrollando una API sencilla con Express, probá `node --watch`. Así evitás instalar `nodemon` y agregás menos dependencias a tu proyecto.

Tené presente que `node --watch` reinicia el proceso de Node.js; no actualiza automáticamente el estado de tu aplicación ni reemplaza las herramientas de recarga del navegador que se usan en el desarrollo frontend.

---

# Analizando el output de `npm audit`
Ya se ve cuál es el problema. Según tu `npm audit`, la vulnerabilidad viene de una dependencia indirecta de `nodemon`, no necesariamente del código de `nodemon` directamente.

## ¿Qué dependencias tienen riesgo?

1. `braces`

Riesgo altoEs el paquete vulnerable. Puede sufrir un agotamiento de la pila de llamadas (stack exhaustion) al procesar patrones anidados, provocando que un proceso de Node.js se cierre.

GitHub

2. `chokidar`

Es la dependencia que utiliza `braces` en tu instalación. Se encarga de observar cambios en archivos y directorios.

3. `nodemon`

Depende de `chokidar`, por eso la alerta aparece al instalar `nodemon`.

La cadena de dependencias es:

`nodemon` → `chokidar` → `braces` (vulnerable).

Importante: tu informe indica que `npm audit fix --force` instalaría `nodemon@1.14.10`, lo cual supone un cambio de versión potencialmente incompatible. No te recomiendo ejecutarlo a ciegas.

## Cómo te recomiendo solucionarlo

La versión publicada actualmente de `nodemon` es la `3.1.14`.

npm

 Tu informe sugiere revisar si quedó instalada una versión antigua o una combinación de dependencias que provoca el problema.

### 1. Comprobá las versiones instaladas

Ejecutá:

bash
```
npm ls nodemon chokidar braces
```

### 2. Probá la reparación automática sin forzar cambios mayores

bash
```
npm audit fix
```

Después comprobá:

bash
```
npm audit
```

### 3. Si siguen apareciendo las vulnerabilidades

Podés reinstalar `nodemon` como dependencia de desarrollo en la versión actual:

bash
```
npm install --save-dev nodemon@3.1.14
```

Luego volvé a ejecutar `npm audit`. Tené en cuenta que actualizar `nodemon` no garantiza resolver la alerta: el aviso de `braces` consultado actualmente indica que todavía no hay una versión corregida publicada.

GitHub

No uses `--force` por ahora. npm advierte que esa opción puede saltarse las protecciones de compatibilidad y cambiar versiones principales.

npm Docs

Si me compartís el resultado de `npm ls nodemon chokidar braces`, te puedo indicar el siguiente paso según las versiones que tengas instaladas.
