# UTN 2026 c2 Div 334

---

# Fecha 1er parcial, *a charlar desde el 19/20 oct*

# Cronograma clases

## Prox clase
- Ver muestras de maquetacion
- Media Queries
- Continuar desde [CSS Display](https://www.w3schools.com/css/css_table.asp)


---

## Clase 2
- Desde Elementos en bloque y en linea hasta HTML Forms
- [Clases, Ids](https://www.w3schools.com/html/html_classes.asp)
- [Divs y etiquetas semanticas](https://www.w3schools.com/html/html_div.asp)
- Prox clase vamos a ver HTML Forms y saltar a CSS

## Clase 1
- HTML hasta [Elementos en Bloque y Elementos en Linea](https://www.w3schools.com/html/html_blocks.asp)
- **Recordatorio: TODAS las etiquetas en linea iran siempre dentro de etiquetas en bloque. [Leccion W3 Schools](https://www.w3schools.com/html/html_formatting.asp)**
- Practica sugerida
    - Hacer una receta de su plato favorito usando las etiquetas HTML que vimos en clase
    - [Ej de receta](https://comedera.com/receta-de-chipa-pan-paraguayo/)

- Repasar Git

- Proxima clase, repasar dudas hasta elementos en bloque y en linea.
- Continuamos desde HTML tables, listas y contenedores

---

## Apuntes
- [Que es el DOM?](https://www.w3schools.com/whatis/whatis_htmldom.asp)

---

## Recursos para la cursada
### Markdown
- [Sintaxis del lenguaje markdown](https://www.markdownguide.org/basic-syntax/)
- [Editor online de markdown](https://dillinger.io/)

---

### React
- [React de cero a experto / Fernando Herrera](https://www.youtube.com/watch?v=oTGnOosMGS0&list=PLCKuOXG0bPi3x4cAt07EElVqk74hWb9ak)
- [Curso fullstack open / Universidad de Helsinki](https://fullstackopen.com/en/)

<hr>

### Angular
- [Angular moderno de cero de experto / Fernando Herrera](https://www.youtube.com/watch?v=9eK45JJa8dY&list=PLCKuOXG0bPi3cfoQcSTaGUnqZbzLA30Hi)

#### [Cursos (gratuitos) de Midudev](https://midu.dev/cursos)

---

## Cursos de formacion para agregar certificados
- [Fundacion YPF](https://lab.fundacionypf.org/formacion-digital)
- [Santander Open Academy](https://app.santanderopenacademy.com/es/program/programa-full-stack-developer-itba-2026)

---

## Practicar con Git
- Instalar [Git Bash](https://git-scm.com/install/windows)
- Repasar para las próximas clases los [apuntes de Git](https://drive.google.com/drive/u/1/folders/1T1LEYs_H-NACabUJcdTXjodw8il6ZDsf)
- [Video Aprende a usar Git en 30 minutos](https://www.youtube.com/watch?v=QGKTdL7GG24)

### Guia rapida Git
1. Abrimos la consola de VSCode `Ctrl + j`
2. Elegimos la terminal en el menu `Git Bash`
3. Practicamos con los comandos esenciales de Git
    - (Para la primera vez) Creamos un repo en github y le damos a clone
    ```sh
    git clone https://github.com/profexabi/UTN2026_c2Div131.git
    ```

    - (Siempre antes de trabajar)
    ```sh
    # Comprobamos que no tenemos cambios sin guardar
    git status

    # Traemos los ultimos cambios
    git pull
    ```

    - Hacemos los cambios pertinentes en nuestro repo, y una vez que terminamos
    ```sh
    # Comprobamos el estado
    git status

    # Para guardar todo
    git add .

    # Registramos los cambios guardados con un mensaje
    git commit -m "Hecho cambio x, ble"

    # Ya con los cambios registrados, enviamos este codigo a nuestro repo
    git push origin main
    ```
