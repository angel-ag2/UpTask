const express = require("express");
const routes = require("./routes");
// con esto somos capaces de leer todos los archivos que tenemos en las carpetas del proyecto
const path = require("path");
const bodyParser = require("body-parser")

// crear una aplicaion express
const app = express();

// donde cargar los archivos estaticos
// para que funciona los estilos CSS, JS
app.use(express.static('public'));

// modelo de vista utilizada para la presentacion de los datos.
// habilitar PUG
app.set("view engine","pug");
// Añadimos la carpeta de vistas
app.set("views",path.join(__dirname,"./views"));

// habilitamos bodyParser para leer datos del formulario
app.set() 

// puerto por localhost:3100
// al poner use sirve para get/post/delete
// si pones app.get() solo lee los get... etc

app.use('/',routes());
app.listen(3100);

