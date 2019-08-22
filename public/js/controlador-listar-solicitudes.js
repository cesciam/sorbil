'use strict';

const tbody = document.querySelector('#tabla-filtrado tbody');
let lista_librerias = [];
let txt_filtro = document.querySelector('#txt-filtro');
const sct_librerias = document.querySelector('#lista-librerias');

let mostrar_cards = async () => {

    lista_librerias = await obtenerLibreriaPorCorreo();
    console.log(lista_librerias);

    for (let i = 0; i < lista_librerias.length; i++) {
            if (lista_librerias[i].estado == 'pendiente') {
                //////////////////////////////////////////////////////
                let contenedor_card = document.createElement('div');
                let contenedor_iconos = document.createElement('div');
                contenedor_card.classList.add('card');

                let header = document.createElement('header');
                let h2 = document.createElement('h2');
                h2.innerText = lista_librerias[i]['empresa'];

                header.appendChild(h2);
                //////////////////////////////////////////////////////
                let aIconoActivar = document.createElement('a');
                aIconoActivar.className = 'list-icon';
                let iconActivar = document.createElement('i');
                iconActivar.className = 'bx bxs-check-square';
                aIconoActivar.appendChild(iconActivar);

                let aIconoEliminar = document.createElement('a');
                aIconoEliminar.className = 'list-icon';
                let iconEliminiar = document.createElement('i');
                iconEliminiar.className = 'bx bxs-x-square';
                aIconoEliminar.appendChild(iconEliminiar);
                //////////////////////////////////////////////////////

                iconActivar.id = 'habilitadoIon';
                aIconoActivar.href = 'ap-solicitudes.html';
                aIconoActivar.addEventListener('click', function () {
                    habilitarUsLib(lista_librerias[i]['_id'], "habilitado");
                    mostrar_cards();
                });
                //////////////////////////////////////////////////////
                iconEliminiar.addEventListener('click', function () {
                    Swal.fire({
                        title: '¿Estás seguro desea rechazar la solicitud?',
                        text: "Ésta acción no se puede revertir",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, estoy seguro'
                    }).then((result) => {
                        if (result.value) {
                            eliminarTodaLalibreriaPorCorreo(lista_librerias[i]['_id']);
                            Swal.fire(
                                'Librería eliminada!',

                            ).then((result) => {
                                if (result.value) {
                                    window.location.reload();
                                }
                            });
                        }
                    })
                });
                //////////////////////////////////////////////////////
                contenedor_card.appendChild(header);
                contenedor_iconos.appendChild(aIconoActivar);
                contenedor_iconos.appendChild(aIconoEliminar);
                contenedor_card.appendChild(contenedor_iconos);
                sct_librerias.appendChild(contenedor_card);
            }
    }
};

let filtrar_cards = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    sct_librerias.innerHTML = '';

    for (let i = 0; i < lista_librerias.length; i++) {
        let tipoUsuario = lista_librerias[i]['tipo_usuario'];

        if (lista_librerias[i]['nombre'].toLowerCase().includes(filtro) || lista_librerias[i]['correo'].toLowerCase().includes(filtro)) {
            let contenedor_card = document.createElement('div');
            contenedor_card.classList.add('card');
            if (tipoUsuario == 'u') {
                let contenedor_card = document.createElement('div');
                let contenedor_iconos = document.createElement('div');
                contenedor_card.classList.add('card');

                let header = document.createElement('header');
                let h2 = document.createElement('h2');
                h2.innerText = lista_librerias[i]['nombre'];

                header.appendChild(h2);

                let contenedor_imagen = document.createElement('div');
                contenedor_imagen.classList.add('contenedor_imagen');
                let foto = document.createElement('img');
                foto.src = lista_librerias[i]['avatar'];

                contenedor_imagen.appendChild(foto);

                let p_correo = document.createElement('p');
                p_correo.innerText = lista_librerias[i]['correo'];

                let aIconoActivar = document.createElement('a');
                aIconoActivar.className = 'list-icon';
                let iconActivar = document.createElement('i');
                iconActivar.className = 'bx bxs-check-square';
                aIconoActivar.appendChild(iconActivar);

                let aIconoEliminar = document.createElement('a');
                aIconoEliminar.className = 'habilitadoIon list-icon';
                let iconEliminiar = document.createElement('i');
                iconEliminiar.className = 'bx bxs-trash';
                aIconoEliminar.appendChild(iconEliminiar);


                if (lista_librerias[i]["estado"] == "Habilitado") {
                    iconActivar.id = 'habilitadoIon';
                }
                aIconoActivar.href = 'ap-listar-usuarios.html';
                aIconoActivar.addEventListener('click', function () {
                    if (lista_librerias[i]["estado"] == "Habilitado") {
                        habilitarUsuario(lista_librerias[i]['_id'], "desabilitado");
                    } else {
                        habilitarUsuario(lista_librerias[i]['_id'], "habilitado");
                    }
                    mostrar_cards();
                });

                // ELIMINAR OFERTAS
                iconEliminiar.addEventListener('click', function () {
                    Swal.fire({
                        title: '¿Estás seguro de eliminar este usuario?',
                        text: "Ésta acción no se puede revertir",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, estoy seguro'
                    }).then((result) => {
                        if (result.value) {
                            eliminarUsuario(lista_librerias[i]['_id']);

                            Swal.fire(
                                '¡Usuario eliminado!',

                            ).then((result) => {
                                if (result.value) {
                                    window.location.reload();
                                }
                            });
                        }
                    })
                });

                contenedor_card.appendChild(header);
                contenedor_card.appendChild(contenedor_imagen);
                contenedor_card.appendChild(p_correo);
                contenedor_iconos.appendChild(aIconoActivar);
                contenedor_iconos.appendChild(aIconoEliminar);
                contenedor_card.appendChild(contenedor_iconos);
                sct_librerias.appendChild(contenedor_card);
            }
        }
    }
};


mostrar_cards();
txt_filtro.addEventListener('keyup', filtrar_cards);