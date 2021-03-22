const express = require("express");
const routes = require("./routes");
// con esto somos capaces de leer todos los archivos que tenemos en las carpetas del proyecto
const path = require("path");
const bodyParser = require("body-parser")
// importar las variables del entorno
require("dotenv").config({ path: "variables.env" })

// helps con algunas funciones
const helper = require('./helpers');

// crear la conexion de BD
const db = require('./config/db');
const { header } = require("express-validator");
// si cargamos los modelos
require("./models/Proyectos");
require("./models/Tareas");
// y hacemos un sync a la BD crea la tabla si no existiera
db.sync()
    .then(() => console.log('conectado al servidor'))
    .catch((error) => console.log(error));

// crear una aplicaion express
const app = express();

// donde cargar los archivos estaticos
// para que funciona los estilos CSS, JS
app.use(express.static('public'));

// modelo de vista utilizada para la presentacion de los datos.
// habilitar PUG
app.set("view engine", "pug");
// Añadimos la carpeta de vistas
app.set("views", path.join(__dirname, "./views"));
app.use((req, res, next) => {
    // para que pueda ser utizalada en cualquier parte de la aplicacion
    res.locals.vardump = helper.vardump;
    // ejemplo de variable
    res.locals.anno = 2022; // #{nombrePagina} del pug
    next();
});

// pasar var dump a la aplicacion

// habilitamos bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }))

// puerto por localhost:3100
// al poner use sirve para get/post/delete
// si pones app.get() solo lee los get... etc

app.use('/', routes());

// si no existe le asigna 0.0.0.0
const host = process.env.HOST || '0.0.0.0';
// si no existe le asigna 3000
const port = process.env.PORT || 3200

app.listen(port,host, ()=> {
    console.log("*** el servidor esta funcionando")
}
);

