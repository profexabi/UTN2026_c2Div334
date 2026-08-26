# Apuntes de HTML

## [Formularios HTML](https://www.w3schools.com/html/html_forms.asp)
1. [Tipos de input en HTML](https://www.w3schools.com/html/html_form_input_types.asp)
2. [Atributos de input](https://www.w3schools.com/html/html_form_attributes.asp)

#### Ejemplo fundamental
```html
<h2>HTML Forms</h2>

<!-- <form> como contenedor de las etiquetas input (entrada) -->
<form action="/action_page.php"> <!-- en el atributo action escribimos a donde mandar los datos del formulario -->

  <!-- <label> o etiqueta es el texto que precede a un campo de entrada 
  		gracias al atributo for, vinculamos este texto al input
        el valor del for debe ser igual al valor del id del input
        Ej:
        	<label for="telefono">Telefono</label>
            <input type="number" id="telefono">
  -->
  <label for="fname">First name:</label><br>
  
  <!-- El input es el elemento fundamental del formulario y representa un dato de entrada 
  	Dentro del input definimos la info a traves de sus atributos
		- en type tenemos el TIPO de dato que vamos a escribir
    	- en name tendremos la VARIABLE que recibira el servidor asociada al valor (value)
    	- en value tendremos el VALOR asociada a la variable (name)
    	- el id nos permitira seleccionar en CSS y en JavaScript el campo
  -->
  <input type="text" id="fname" name="fname" value="John"><br>
  
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  
 <!-- Hay distintos <input> entre ellos el input de enviar datos que es el Submit -->
  <input type="submit" value="Submit">
  
</form> 
```