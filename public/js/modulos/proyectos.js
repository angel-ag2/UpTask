import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector('#eliminar-proyecto')

if (btnEliminar) {
    btnEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        //console.log(urlProyecto)

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
            if (result.isConfirmed) {
                // enviar peticion de borrado a axios

                const url = `${location.origin}/proyectos/${urlProyecto}`

                axios.delete(url, { params: { urlProyecto } })
                    .then(function (respuesta) {
                        console.log(respuesta);

                        Swal.fire(
                            'Proyecto Eliminado',
                            respuesta.data,
                            'success'
                        );

                        // redireccionar al inicio
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 3000);
                    })
                    .catch(() => {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el Proyecto'
                        })
                    })





                //console.log(url)

            }
        })
    })
}

export default btnEliminar;
