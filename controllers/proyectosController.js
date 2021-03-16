exports.proyectosHome = (req,res)=>{
    // esto solo envia un texto
    //res.send("hola");
    // al poner RENDER se puede presentar en HTML
    res.render("index",{
        nombrePagina : "Proyectos" 
    });
 }


 exports.formularioProyecto = (req,res)=>{
    res.render("nuevoProyecto",{
        nombrePagina : "Nuevo Proyecto"
    })
    ;
 }

 exports.nuevoProyecto = (req,res)=>{
    
     console.log(req.body);
 }
