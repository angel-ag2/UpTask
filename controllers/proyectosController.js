const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas")
const slug = require('slug');


exports.proyectosHome = async (req, res) => {
    // esto solo envia un texto
    //res.send("hola");
    // al poner RENDER se puede presentar en HTML
    const proyectos2 = await Proyectos.findAll();
    res.render('index', { nombrePagina: 'Proyectos', proyectos2 })

}

exports.ProyectoPorUrl = async (req, res, next) => {
    const proyectos2 = await Proyectos.findAll();
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })
    if (!proyecto) return next();

    const tareas = await Tareas.findAll({
        where: { proyectoId: proyecto.id },
        include: [
            { model: Proyectos }
        ]
    })
    // console.log(tareas)

    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyectos2,
        proyecto,
        tareas
    })

}

exports.formularioProyecto = async (req, res) => {
    const proyectos2 = await Proyectos.findAll();
    res.render("nuevoProyecto", {
        nombrePagina: "Nuevo Proyecto",
        proyectos2
    })
        ;
}

exports.FormularioEditar = async (req, res) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    })
    const [proyectos2, proyecto] = await Promise.all([proyectosPromise, proyectoPromise])

    console.log(proyecto)
    // render a la vista
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos2,
        proyecto
    });
}


exports.nuevoProyecto = async (req, res) => {
    const proyectos2 = await Proyectos.findAll();

    // console.log(req.body);
    //validar que tenemos inpuut
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre de proyecto' });
    }

    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: "Nuevo Proyecto",
            errores,
            proyectos2
        })
    } else {
        // no hay errores
        // insertamos en la BD
        // es un PROMISE
        // Proyectos.create({nombre})
        //    .then(() =>console.log('insertado correctamente'))
        //    .catch(error=> console.log(error));
        // lo mismo pero con await        

        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/') // para que nos lleve al HOME
    }
}

exports.ProyectoEliminar = async (req, res, next) => {

    const { urlProyecto } = req.query

    //console.log(urlProyecto)

    const resultado = await Proyectos.destroy({
        where: { url: urlProyecto }
    })

    if (!resultado) {
        return next();
    }
    res.status(200).send(`Proyecto ${urlProyecto} eliminado correctamente`)
    //res.redirect('/') // para que nos lleve al HOME
    next()
}

exports.actualizarProyecto = async (req, res) => {

    // console.log(req.body);
    //validar que tenemos inpuut
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre de proyecto' });
    }

    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    })
    const [proyectos2, proyecto] = await Promise.all([proyectosPromise, proyectoPromise])

    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: "Nuevo Proyecto",
            errores,
            proyectos2,
            proyecto
        })
    } else {
        await Proyectos.update(
            { nombre: nombre },
            { where: { id: req.params.id } }
        )
        res.redirect('/') // para que nos lleve al HOME
    }

}
