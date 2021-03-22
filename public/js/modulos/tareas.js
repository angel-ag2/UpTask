import axios from "axios"
import Swal from "sweetalert2";

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {

    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idtarea = icono.parentElement.parentElement.dataset.tarea;
            // request hacia la nueva ruta
            // /tareas/:id
            const url = `${location.origin}/tareas/${idtarea}`
            axios.patch(url, { idtarea })
                .then(function (respuesta) {
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo')
                    }
                })
        }

        if (e.target.classList.contains('fa-trash')) {

            Swal.fire({
                title: 'Confirmar borrado?',
                text: "Esta accion no se puede deshacer!",
                icon: 'Aviso',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarlo!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                const tareaHTML = e.target.parentElement.parentElement
                const idtarea = tareaHTML.dataset.tarea;
                
                // request hacia la nueva ruta
                // /tareas/:id
                const url = `${location.origin}/tareas/${idtarea}`
                axios.delete(url, { idtarea })
                    .then(function (respuesta) {
                        if (respuesta.status === 200) {
                            tareaHTML.parentElement.removeChild(tareaHTML);
                        }
                    })  
                }
            )         
        }
    })
}

