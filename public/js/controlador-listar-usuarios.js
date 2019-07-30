'use strict';

const tbody = document.querySelector('#tabla-filtrado tbody');
let lista_usuarios = [];
let txt_filtro = document.querySelector('#txt-filtro');
const sct_usuarios = document.querySelector('#lista-usuarios');


let mostrar_cards = async() => {

    lista_usuarios = await obtenerUsuarios();
    for (let i = 0; i < lista_usuarios.length; i++) {
        let contenedor_card = document.createElement('div');
        contenedor_card.classList.add('card');

        let header = document.createElement('header');
        let h2 = document.createElement('h2');
        h2.innerText = lista_usuarios[i]['nombre'];

        header.appendChild(h2);

        let contenedor_imagen = document.createElement('div');
        contenedor_imagen.classList.add('contenedor_imagen');
        let foto = document.createElement('img');
        foto.src = lista_usuarios[i]['avatar'];

        contenedor_imagen.appendChild(foto);

        let p_correo = document.createElement('p');
        p_correo.innerText = lista_usuarios[i]['correo'];

        let btn_perfil = document.createElement('button');
        btn_perfil.innerText = 'Ver perfil';
        btn_perfil.dataset._id = lista_usuarios[i]['correo'];
        btn_perfil.addEventListener('click', function() {
            //console.log(this.dataset._id);
            window.location.href = `ver-perfil-usuario.html?_id=${this.dataset.correo}`
        });

        contenedor_card.appendChild(header);
        contenedor_card.appendChild(contenedor_imagen);
        contenedor_card.appendChild(p_correo);
        contenedor_card.appendChild(btn_perfil);

        sct_usuarios.appendChild(contenedor_card);

    }

};

let filtrar_cards = async() => {

    let filtro = txt_filtro.value.toLowerCase();
    sct_usuarios.innerHTML = '';

    for (let i = 0; i < lista_usuarios.length; i++) {
        if (lista_usuarios[i]['nombre'].toLowerCase().includes(filtro) || lista_usuarios[i]['correo'].toLowerCase().includes(filtro)) {
            let contenedor_card = document.createElement('div');
            contenedor_card.classList.add('card');

            let header = document.createElement('header');
            let h2 = document.createElement('h2');
            h2.innerText = lista_usuarios[i]['nombre'];

            header.appendChild(h2);

            let contenedor_imagen = document.createElement('div');
            contenedor_imagen.classList.add('contenedor_imagen');
            let foto = document.createElement('img');
            foto.src = '../imgs/avatar-placeholder.png';

            contenedor_imagen.appendChild(foto);

            let p_correo = document.createElement('p');
            p_correo.innerText = lista_usuarios[i]['correo'];

            let btn_perfil = document.createElement('button');
            btn_perfil.innerText = 'Ver perfil';
            btn_perfil.dataset._id = lista_usuarios[i]['_id'];
            btn_perfil.addEventListener('click', function() {
                //console.log(this.dataset._id);
                window.location.href = `ver-perfil-usuario.html?_id=${this.dataset._id}`
            });

            contenedor_card.appendChild(header);
            contenedor_card.appendChild(contenedor_imagen);
            contenedor_card.appendChild(p_correo);
            contenedor_card.appendChild(btn_perfil);

            sct_usuarios.appendChild(contenedor_card);
        }
    }
};


mostrar_cards();
txt_filtro.addEventListener('keyup', filtrar_cards);