const Proyectos = require('../models/Proyectos')
const Tareas = require("../models/Tareas")

exports.AgregarTarea = async (req,res,next) =>{
    // obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({where:{url: req.params.url}})

    const {tarea} = req.body
    const estado = 0;
    const proyectoId = proyecto.id

   const resultado=await Tareas.create({tarea, estado,proyectoId});

   if(!resultado) {
       console.log("error")
       return next();
   }        
   res.redirect(`/proyectos/${req.params.url}`)
}

exports.cambiarEstadoTarea = async (req,res,next) =>{

    const id= req.params.id

    const tarea = await Tareas.findOne({
        where: {id:id}})
    
    if(tarea){

        // === es como == pero tiene en cuenta el formato de la variable
        // no es lo mismo un string con valor 0 q un integer con 0
        tarea.estado = tarea.estado===0?1:0

        const resultado = await tarea.save();

        if(!resultado) return next();

        res.status(200).send('actualizado')
    }else{
        console.log("no lo encuentra")
    }

}

exports.eliminarTarea = async (req,res,next) =>{
    const id= req.params.id

    const resultado = await Tareas.destroy({
        where: { id: id}})

    if(!resultado)    {
        return next();
    }   
    res.status(200).send(`Tarea ${id} eliminada correctamente`)
    res.redirect('/') // para que nos lleve al HOME
    next()
}