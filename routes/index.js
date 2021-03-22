// express router
const express = require("express");
const router = express.Router();

// importamos express validator
const {body} = require("express-validator/check");

// importar el controlador
const proyectosController = require("../controllers/proyectosController");
const tareasController = require("../controllers/tareasController");
const Tareas = require("../models/Tareas");

module.exports = function(){
    router.get('/',proyectosController.proyectosHome);
    router.get("/nuevo-proyecto",proyectosController.formularioProyecto)
    router.post("/nuevo-proyecto",
        // con esto conseguimos...
        // anges de grabar el dato, eliminar los espacios en blanco
        // que tenga valor y que el valor no sea estraño como <Hola>
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto)
     // TODO: teminar @angel. 

    // listar proyectos
    router.get('/proyectos/:url',proyectosController.ProyectoPorUrl);

    // actualizar el proyecto

    router.get('/proyecto/editar/:id',proyectosController.FormularioEditar)

    router.post("/nuevo-proyecto/:id", body('nombre').not().isEmpty().trim().escape(), 
    proyectosController.actualizarProyecto)

    // eliminar proyecto
    router.delete("/proyectos/:url",proyectosController.ProyectoEliminar)

    // tares

    router.post('/proyectos/:url',tareasController.AgregarTarea)

    // actualizar tarea

    router.patch('/tareas/:id',tareasController.cambiarEstadoTarea)

    // eliminar tarea

    router.delete("/tareas/:id",tareasController.eliminarTarea)

 return router;    
}