'use strict';

'use strict';
// Aqui empiezan todas las variables para subir las fotos a cloudinary
const imgpreview = document.getElementById('img_preview');
const uploader_avatar = document.getElementById('img_uploader_portada');
const progress_bar = document.getElementById('progress_bar');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/fenixsorbil/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'gmqflv3u';

// Aqui terminan las variables para subir las fotos a cloudinary

//variables de la librería
const img_uploader_imagen = document.querySelector('#portada');
const input_usuario = document.querySelector('#txt-usuario');
const input_correo = document.querySelector('#txt-correo');
const input_empresa = document.querySelector('#txt-empresa');
const input_telefono = document.querySelector('#txt-telefono');
const input_descripcion = document.querySelector('#txt-descripcion');
const input_provincia = document.querySelector('#txt-provincia');
const input_canton = document.querySelector('#txt-canton');
const input_distrito = document.querySelector('#txt-distrito');
const input_direccion_exacta = document.querySelector('#txt-direccion-exacta');

const btn_guardar = document.querySelector('#btn-enviar');

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');


let correoLib = JSON.parse(sessionStorage.getItem('activo'));
let correoActivo = correoLib.correo;

let cargarFormulario = async () => {

    let libreriaid = await obtenerLibreriaPorCorreo(correoActivo);

    if (libreriaid) {
        img_uploader_imagen.src = libreriaid[0].imagen;
        input_empresa.value = libreriaid[0].empresa;
        descripcion.value = libreriaid[0].descripcion;
        telefono.value = libreriaid[0].telefono;
        correo.value = libreriaid[0].correo;
        provincia.value = libreriaid[0].provincia;
        canton.value = libreriaid[0].canton;
        distrito.value = libreriaid[0].distrito;
        direccion_exacta.value = libreriaid[0].direccion_exacta;
    }
};

let validar = (pusuario, pcorreo, pempresa, ptelefono, pdescripcion, pdireccion_exacta) => {

    let error = false;

    //validación de la librería

    if (img_uploader_imagen.src == 'http://localhost:3000/public/imgs/book-placeholder.png') {
        error = true;
        img_uploader_imagen.classList.add('input_error');

    } else {
        img_uploader_imagen.classList.remove('input_error');
    }

    if (pusuario == '') {
        error = true;
        input_usuario.classList.add('input_error');
    } else {
        input_usuario.classList.remove('input_error');
    }

    if (pcorreo == '') {
        error = true;
        input_correo.classList.add('input_error');
    } else {
        input_correo.classList.remove('input_error');
    }

    if (pempresa == '') {
        error = true;
        input_empresa.classList.add('input_error');
    } else {
        input_empresa.classList.remove('input_error');
    }

    if (ptelefono == '') {
        error = true;
        input_telefono.classList.add('input_error');
    } else {
        input_telefono.classList.remove('input_error');
    }
    if (pdescripcion == '') {
        error = true;
        input_descripcion.classList.add('input_error');
    } else {
        input_descripcion.classList.remove('input_error');
    }

    if (pprovincia == '') {
        error = true;
        input_provincia.classList.add('input_error');
    } else {
        input_provincia.classList.remove('input_error');
    }

    if (pcanton == '') {
        error = true;
        input_canton.classList.add('input_error');
    } else {
        input_canton.classList.remove('input_error');
    }

    if (pdistrito == '') {
        error = true;
        input_distrito.classList.add('input_error');
    } else {
        input_distrito.classList.remove('input_error');
    }

    if (pdireccion_exacta == '') {
        error = true;
        input_direccion_exacta.classList.add('input_error');
    } else {
        input_direccion_exacta.classList.remove('input_error');
    }

    return error;

};

let validarCorreo = (pcorreo) => {

    let errorCorreo = false;
    let correoValido = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if (!correoValido.test(pcorreo)) {
        errorCorreo = true;
        input_correo.classList.add('input_error');
    }
    else {
        input_correo.classList.remove('input_error');
    }
    return errorCorreo;
};

let validarTelefono = (ptelefono) => {

    let errorTelefono = false;
    let telefonoValido = /\d{2}-?\d{2}-?\d{2}-?\d{2}$/;

    if (!telefonoValido.test(ptelefono)) {
        errorTelefono = true;
        input_telefono.classList.add('input_error');

    }
    else {
        input_telefono.classList.remove('input_error');
    }
    return errorTelefono;
};

let modificarlib = async () => {

    //variables de la librería
    let src_imagen = img_uploader_imagen.src;
    let usuario = input_usuario.value;
    let correo = input_correo.value;
    let empresa = input_empresa.value;
    let telefono = input_telefono.value;
    let descripcion = input_descripcion.value;
    // let provincia = input_provincia.value;
    // let canton = input_canton.value;
    // let distrito = input_distrito.value;
    let direccion_exacta = input_direccion_exacta.value;
    let latitud = enviarLat();
    let longitud = enviarLon();

    let error = validar(usuario, correo, empresa, telefono, descripcion, direccion_exacta);
    let errorTelefono = validarTelefono(telefono);
    let errorCorreo = validarCorreo(correo);

    if (error == false, errorCorreo == false && errorTelefono == false) {
        // let estado = 'habilitado';
        modificarlib(_id, src_imagen, usuario, correo, empresa, telefono, descripcion, direccion_exacta, latitud, longitud);
        Swal.fire({ //formato json
            title: 'Se ha modificado la información exitosamente',
            type: 'success',
        }).then((result) => {
            if (result.value) {
                window.location.href = `ver-perfil-administrador-libreria.html?_id=${_id}`;
            }
        });
        //Se llama a la función para limpiar el formulario

    } else {
        Swal.fire({ //formato json
            title: 'No se ha modificado la información',
            type: 'warning',
            text: 'Revise los campos resaltados e inténtelo de nuevo'
        })
    }
};

cargarFormulario();
btn_guardar.addEventListener('click', modificarlib);