# Profundizando en `const`
Porque en JavaScript `const` **no hace que el valor sea inmutable**. Lo que hace es impedir que la **variable sea reasignada**.

 La clave es distinguir entre **la referencia** y **el objeto al que apunta**.

```
const persona = {
  nombre: "Juan"
};

persona.nombre = "Pedro"; // ✅ permitido
```

 `persona` contiene una referencia a un objeto. `const` garantiza que esa referencia no pueda cambiar:

```
persona = {}; // ❌ TypeError
```

 Pero sí puedes modificar el objeto al que apunta:

```
persona
   │
   ▼
┌──────────────┐
│ nombre: Juan │
└──────────────┘

       ↓ modificar propiedad

┌───────────────┐
│ nombre: Pedro │
└───────────────┘
```

 Lo mismo ocurre con arrays:

```
const numeros = [1, 2, 3];

numeros.push(4); // ✅
numeros[0] = 99; // ✅

numeros = [5, 6]; // ❌
```

 ### Entonces, ¿qué hace realmente `const`?

 Piensa en esto:

```
const x = valor;
```

 `const` significa:

 > "No puedes hacer que `x` apunte a otra cosa."

 No significa:

 > "La cosa a la que apunta `x` no puede cambiar."

 Por eso esto funciona:

```
const usuario = { nombre: "Ana" };

usuario.nombre = "Laura";
```

 Pero esto no:

```
const usuario = { nombre: "Ana" };

usuario = { nombre: "Laura" };
// ❌
```

 En el segundo caso estás intentando cambiar la referencia de `usuario`.

 ### ¿Y cómo hago un objeto realmente inmutable?

 Una opción es `Object.freeze()`:

```
const usuario = Object.freeze({
  nombre: "Ana"
});

usuario.nombre = "Laura";

console.log(usuario.nombre); // "Ana"
```

 Pero hay una sutileza importante: `Object.freeze()` es **superficial**.

```
const usuario = Object.freeze({
  nombre: "Ana",
  direccion: {
    ciudad: "La Plata"
  }
});

usuario.direccion.ciudad = "Buenos Aires"; // ✅ todavía puede mutarse
```

 Porque el objeto externo está congelado, pero `direccion` sigue siendo mutable.

 En resumen:

```
const
 │
 ├── ❌ reasignar la variable
 │
 └── ✅ mutar el objeto/array referenciado
```

 Esto es deliberado en JavaScript: `const` controla la **asignación de la variable**, no la mutabilidad del valor.


 ---



# Entendiendo `Map`
Tiene sentido **si querés usar distintos tipos de valores como claves**. La particularidad de `Map` en JavaScript es que sus claves **no tienen que ser strings**.

 En tu ejemplo:

```
const mapa = new Map();

mapa.set(123, "ID");
mapa.set(true, "activo");
```

 estás creando dos asociaciones:

```
123  → "ID"
true → "activo"
```

 Y después podés hacer:

```
mapa.get(123);  // "ID"
mapa.get(true); // "activo"
```

 ### ¿Por qué no un objeto?

 Con un objeto:

```
const obj = {};

obj[123] = "ID";
obj[true] = "activo";
```

 JavaScript convierte esas claves a strings:

```
obj["123"];
obj["true"];
```

 En cambio, `Map` **conserva el tipo de la clave**:

```
mapa.get(123);   // busca la clave número 123
mapa.get("123"); // busca otra clave distinta → undefined
```

 También podés usar objetos como claves:

```
const usuario = { nombre: "Juan" };

const mapa = new Map();

mapa.set(usuario, "administrador");

mapa.get(usuario); // "administrador"
```

 Eso es algo que un objeto común no hace de la misma manera.

 ### Pero tu ejemplo concreto...

 Si solamente tenés:

```
mapa.set(123, "ID");
mapa.set(true, "activo");
```

 no hay una ventaja particularmente útil: es más bien un ejemplo para mostrar que **`Map` permite claves de distintos tipos**.

 Un caso más realista sería:

```
const usuarios = new Map();

usuarios.set(123, { nombre: "Juan" });
usuarios.set(456, { nombre: "Ana" });

usuarios.get(123);
// { nombre: "Juan" }
```

 Ahí `Map` tiene bastante más sentido: usás el ID numérico como clave y recuperás rápidamente la información asociada.

---

# `JavaScript` vs `TypeScript`

**TypeScript** es un superconjunto tipado estáticamente de **JavaScript** que añade seguridad de tipos y herramientas avanzadas, mientras que **JavaScript** es un lenguaje dinámico interpretado directamente por el navegador. La diferencia principal radica en **cuándo se detectan los errores**: TypeScript los captura en tiempo de compilación, mientras que JavaScript lo hace en tiempo de ejecución.

### Comparativa Clave

| Característica | JavaScript | TypeScript |
| :--- | :--- | :--- |
| **Tipado** | Dinámico | Estático (opcional) |
| **Detección de Errores** | Tiempo de ejecución | Tiempo de compilación |
| **Rendimiento** | Nativo | Identico en ejecución (se compila a JS) |
| **Curva de Aprendizaje** | Baja | Más alta (requiere aprender tipos) |
| **Ideal Para** | Prototipos rápidos, scripts pequeños | Aplicaciones grandes, mantenimiento a largo plazo |

**Recomendación de uso:**
*   Elige **JavaScript** para proyectos pequeños, scripts simples o cuando la velocidad de desarrollo inicial es prioritaria sobre la escalabilidad.
*   Elige **TypeScript** para aplicaciones empresariales, equipos grandes o proyectos que requieren mantenimiento prolongado, ya que facilita el **refactorizado seguro** y mejora la **autocompletación** y documentación del código.

**Nota importante:** TypeScript no reemplaza a JavaScript; se compila en JavaScript estándar. Por ello, se recomienda aprender primero los fundamentos de **JavaScript** antes de pasar a TypeScript.


---



# Valores `truthy` y `falsy` en JavaScript
En JavaScript, un valor **falsy** es aquel que se evalúa como `false` en un contexto booleano (`if`, `||`, `&&`, etc.). Solo existen **7 valores falsy**:

| Valor | Tipo |
|---|---|
| `false` | boolean |
| `0`, `-0`, `0n` | number / bigint |
| `""` (cadena vacía) | string |
| `null` | object (especial) |
| `undefined` | undefined |
| `NaN` | number |

**Todo lo demás es truthy**, incluyendo:

- `"0"`, `"false"` (strings no vacías)
- `[]`, `{}` (arrays y objetos, incluso vacíos)
- `function(){}`, `true`, `Infinity`, `-Infinity`

```javascript
// Falsy
Boolean(false);     // false
Boolean(0);         // false
Boolean(-0);        // false
Boolean(0n);        // false
Boolean("");        // false
Boolean(null);      // false
Boolean(undefined); // false
Boolean(NaN);       // false

// Truthy (sorpresas comunes)
Boolean("0");       // true  ← string, no número
Boolean("false");   // true  ← string, no boolean
Boolean([]);        // true  ← array vacío
Boolean({});        // true  ← objeto vacío
Boolean(() => {});  // true  ← función
```

La clave: memoriza la lista corta de **falsy** y todo lo que no esté ahí es **truthy**.

