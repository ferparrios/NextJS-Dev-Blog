---
title: 'Ambientes Virtuales en Python y Flask'
excerpt: 'Los ambientes virtuales nos permiten tener distintas versiones de modules que instalaremos.'
coverImage: '/assets/blog/dynamic-routing/cover.jpeg'
date: '2023-01-19T05:35:07.322Z'
author:
  name: Ferparrios
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpeg'
---

Los ambientes virtuales nos permiten tener distintas versiones de modules que instalaremos.

Para ejecutar uno en python hacemos lo siguiente:

```shell
python3 -m venv venv 
```

Y para Windows

```python
py -3 -m venv venv
```

Luego de crear la caperta tendremos que activar el ambiente virtual con el siguiente comando

```python
. venv/bin/activate
```

En la linea de comandos veremos que está activado nuestro ambiente virtual porque aparecerá “venv” delante de la ubicación de nuestra carpeta en el terminal.

Ahora pasaremos a instalar el framework de Flask

```python
pip3 install Flask
```

Crearemos un archivo base y pasaremos a importar Flask

```python
from flask import Flask
app = Flask(__name__)
```

app será nuestro punto de partida o nuestro main cuando ejecutemos el archivo de Flask.

Con un decorador nosotros crearemos nuestra primera ruta y definiremos una función de partida

```python
@app.route('/')
def index():
  return 'Hola Mundo'
```

Para poder correr nuestro archivo e indicarle a Flask cual es el punto de partida haremos lo siguiente

```python
export FLASK_APP=holamundo.py
```

o en Windows

```python
set FLASK_APP=holamundo.py
```

Luego en nuestra misma linea de comandos podremos ejecutar nuestro servidor con el siguiente comando:

flask run

Tendremos el siguiente mensaje en nuestro terminal:

![MarineGEO circle logo](/assets/blog/dynamic-routing/post1.png "MarineGEO logo")

Para lo cual podremos pinchar en la dirección en donde pone que está corriendo y abrirá en nuestro navegador regresando el texto que le mandamos en la función index.

![MarineGEO circle logo](/assets/blog/dynamic-routing/post1-2.png "MarineGEO logo")

Siempre que vayamos a definir rutas tenemos que llamar nuevamente al decorador @app con el metodo de route y definiremos la ruta y la funcion que  va a retornar lo que necesitamos

@app.route('/esto')
def esto():
	return 'Esto

Sin embargo al agregar nuestra nueva ruta Flask no va a tomar los cambios inmediatamente, por lo que necesitamos hacer lo siguiente.

```python
export FLASK_ENV=development
```

y volvemos a correr nuestra aplicación con flask run, esto hace que nuestra aplicación entre en modo de desarrollo y también activa el modo “debug”

Ahora pasaremos a pasarle datos mediante variables las cuales vamos a enviar por medio de la url de la siguiente manera

```python
@app.route('/esto/<usuario>')
def esto(usuario):
return 'Esto' + usuario
```

luego de nuestra ruta definimos la variable encerrada en los símbolos de mayor que y menor que “<>”, la variable a enviar en este caso la llamaremos usuario y también tenemos que pasarla en la función de esta como un parametro, solo para mostrarla y pintarla en el navegador la concatenamos al retorno de esta.

![MarineGEO circle logo](/assets/blog/dynamic-routing/post1-3.png "MarineGEO logo")

Metodos http:

Vamos a ver 4 de los métodos necesario para poder trabajar que son GET, POST, PUT, PATCH, DELETE,

- GET:  Listas o mostrar algo
- POST: Crear algo
- PUT: Actualizar algo o reemplazar
- PATCH: Actualizar parcialmente algo
- DELETE: Borrar algo

Vamos a asignar métodos en las rutas que tenemos tomando primero de ejemplo la ruta de post

```python
@app.route('post/<post_id>', methods=['GET', 'POST'])
def post(post_id):
	return 'El id del post es: ' + post_id
```

Mediante un array usando methods para poder indicar que tipo de método vamos a usar en nuestra ruta.

Mediante GET no habrá problemas ya que se llama desde el navegador como lo estamos haciendo ya, pero con POST, veamos como se hace desde la terminal.

```python
curl -X POST http://localhost:5000/post/1
```

Esto nos mostrará lo que definimos en nuestra función que debe de retornar, en este caso “El id del post es: 1”

Pero que pasa si tratamos de acceder mediante un método que no se encuentra registrado en la ruta, como por ejemplo PUT.

```python
curl -X PUT http://localhost:5000/post/1
```

Esto nos dará un error 405, indicando que el método no está permitido por nuestra ruta

```python
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>405 Method Not Allowed</title>
<h1>Method Not Allowed</h1>
<p>The method is not allowed for the requested URL.</p>
```

Algo interesante que podemos hacer cuando usamos más de un método es condicionar lo que mostramos si es que se recibe una llamada usando uno u otro, esto lo haremos con “request” de la siguiente manera.

```python
@app.route('/post/<post_id>', methods=['GET', 'POST'])
def post(post_id):
  if request.method == 'GET':  
    return 'El id del post es: ' + post_id
  else:
    return 'Este es otro método y no GET'
```

De esta forma obtendremos resultados distintos si usamos un método u otro.

Redirecciones

Con Flask vamos a poder manipular las URLs que vamos creando y unas de las primeras cosas que vamos a ver en esto es el como hacer redirecciones mediante las funciones definidas en nuestro documento, tomamos este ejemplo:

```python
@app.route('/mimi', methods=['POST', 'GET'])
def mimi():
  return redirect(url_for('lala', post_id=2))
  return 'Mimi'
```

Veremos que esta nueva ruta tiene aplicados los metodos POST y GET para poder ser llamados y a su vez en el cuerpo de la funcion vamos a usar el objeto de redirect el cual siempre tiene que estar retornado para que pueda funcionar correctamente en nuestro navegador, a su vez cuando nosotros vayamos a hacer una redirección siempre tendremos que indicar a que función vamos a redireccionar, por qué a una función y no a una url? porque estas manejan todos los cambios dentro de las últimas mencionadas, en este caso tenemos que estamos usando el objeto redirect junto con el url_for, ambos deben de ser importados desde Flask en la parte superior, y al colocar la función a la cual vamos a llamar tendremos que colocar el parametro que también le tenemos que enviar en caso esta lo requiera, al entrar en nuestro navegador en “/mimi”, esta nos llevará a la ruta definida en la función lala con el parametro que le hemos mandado dentro del redirect.

Abortar una petición

Esto es para poder regresar al usuario algún error que necesitemos mostrar, también nos sirve para mostrar que está pasando o por qué no se puede acceder a dicha pagina.

Importamos desde Flask el objeto de abort y luego lo implementamos en la función en la que necesitemos ponerle

 

```python
def mimi():
  abort(401)
```

Al entrar a la ruta definida en esa función retornará el mensaje de error definido en el código 401.

Retornar un HTML

En el siguiente ejercicio vamos a retornar un archivo HTML cuando se haga un llamado a una de nuestras rutas, para esto importaremos a “render_template” desde Flask y este será el encargado de hacer la renderización del archivo que le mandemos.

Cabe destacar que nosotros tendremos que definir una carpeta para nuestro templates ya que Flask va a buscar esta carpeta en donde buscará nuevamente el archivo que le indicaremos por medio de la función, entonces crearemos una carpeta llamada “templates” y dentro crearemos nuestro archivo html

```python
def mimi():
	return render_template('mimi.html')
```

Al ejecutarlo correctamente podremos ver que llama al archivo “mimi.html” el cual ya habremos creado y definido nu H1 con el texto,  “Soy Mimi”.


![MarineGEO circle logo](/assets/blog/dynamic-routing/post1-4.png "MarineGEO logo")

Retornar un JSON

Para poder recibir un json simplemente necesitamos retornar en la función de la ruta asiciada un diccionario, que como sabemos es igual a un objeto JSON en JavaScript, esto lo haremos de la siguiente manera:

```python
@app.route('/json', methods=['GET', 'POST'])
def json_template():
  return {
    "username": "Usuario 1",
    "email": "usuario@correo.com"
  }
```

 Y en el navegador tendremos el siguiente resultado:

 ![MarineGEO circle logo](/assets/blog/dynamic-routing/post1-5.png "MarineGEO logo")

Usando MYSQL y Flask

Conectaremos la base de datos en MySql a Flask y rederizaremos los datos, primero hay que usar el conector de mysql para python.

```python
pip3 install mysql-connector-python
```

Luego comenzamos usando mysql dentro de nuestro archivo base

```python
import mysql.connector

midb = mysql.connector.connect(
  host="localhost",
  user="usuario",
  password="contrasena",
  database="prueba"
)

cursor = midb.cursor(dictionary=True)
```

De esta forma con mysql connector obtenemos la función de connector para que se conecte con nuestra base de datos que vamos a definir en midb, detallamos el host, el usuario, contraseña y la base de datos que vamos a usar.

Luego declaramos nuestro cursor, y le vamos a pasar el parámetro de dictionary en True para que pueda regresarnos los valores por consola mediante un json.

En la función de la ruta hacemos lo siguiente”:

```python
@app.route('/data', methods=['GET', 'POST'])
def data():
  cursor.execute('select * from Usuario')
  usuarios = cursor.fetchall()
  print(usuarios)
  return render_template('mimi.html', usuarios=usuarios)
```

En este caso lo he definido en una nueva ruta con sus métodos GET y POST, dentro de la función para esta ruta vamos a llamar a nuestros datos usando el cursor que nos da mysql para python, ejecutando la llamada a nuestra base de datos ‘select * from Usuario’, traemos toda la información de la tabla Usuario

luego con fetchall vamos a obtener esa información para poder mostrarla en algún lugar.

En la variable usuarios es la que hemos definido para que pueda almacenar la información que estamos trayendo.

Luego podemos mandar un print por consola y veremos que tenemos los datos solicitados y al final retornaremos la información en un archivo HTML mediante render_template en donde vamos a pasarle como atributo usuarios para hacer lo siguiente.

```python
<h1>Soy Mimi</h1>
{% for usuario in usuarios %}
  <li>
    {{ usuario.username }}
  </li>  
{% endfor %}
```

Esta es una forma de iterar dentro de la data que nos trae mysql y acá estamos mostrando el nombre del usuario en este bloque.

Datos adicionales de los Venv

```python
pip3 freeze
```

Muestra las dependencias instaladas en nuestro entorno virtual

```python
pip3 freeze > requirements.txt
```

Exporta nuestras dependencias instaladas en un archivo txt para que lo puedan observar al subir nuestro proyecto a un repositorio por ejemplo

```python
pip3 install -r requirements.txt
```

Permite instalar todas las dependencias que tenemos en nuestro archivo de requeriments.txt