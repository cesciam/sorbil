'use strict';

let registrarUsuario = (pavatar, pusuario, pcorreo, pcontrasena, pnombre, pid, pprimerApellido, psegundoApellido, psexo, pprovincia, pcanton, pdistrito, pdireccionExacta, pdireccion_longitud, pdireccion_latitud) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrar-usuario',
        responseType: 'json',
        data: {
            avatar: pavatar,
            usuario: pusuario,
            correo: pcorreo,
            contrasena: pcontrasena,
            nombre: pnombre,
            id: pid,
            sexo: psexo,
            primer_apellido: pprimerApellido,
            segundo_apellido: psegundoApellido,
            provincia: pprovincia,
            canton: pcanton,
            distrito: pdistrito,
            direccion_exacta: pdireccionExacta,
            direccion_latitud: pdireccion_latitud,
            direccion_longitud: pdireccion_longitud
        }
    });
};

let validar_credenciales = async (pcorreo, pcontrasena) => {
    let respuesta = '';
    const peticion = await axios({
        method: 'post',
        url: 'http://localhost:4000/api/validar-credenciales',
        responseType: 'json',
        data: {
            correo: pcorreo,
            contrasena: pcontrasena
        }

    });


    sessionStorage.setItem('activo', JSON.stringify(peticion.data.usuario));


    // peticion.fail(function (usuario) {
    //     respuesta = usuario;
    // });
    return peticion.data;
};


let obtenerUsuarios = async () => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-usuarios',
            responseType: 'json'
        });

        return response.data.lista_usuarios;
    } catch (error) {
        console.log(error);
    }
};

let obtenerUsuarioCorreo = async(correo) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-usuario-correo/${correo}`,
            responseType: 'json'
        });

        return response.data.usuario;
    } catch (error) {
        console.log(error);
    }
};

// Funciones para obtener coordenadas de google maps
let corlatitud;
let corlongitud;

let latitud = (platitud) =>{
    corlatitud = platitud;
};

let longitud = (plongitud) =>{
    corlongitud = plongitud;
};

let enviarLat = () =>{
    return corlatitud;
}

let enviarLon = () =>{
    return corlongitud;
}

let registrarTarjetas = (pid, pnombre, pnum_tarjeta, pfecha_ven, pcvv) =>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/agregar-tarjeta',
        responseType: 'json',
        data: {
            _id: pid,
            nombre: pnombre,
            num_tarjeta: pnum_tarjeta,
            fecha_ven: pfecha_ven,
            cvv: pcvv
        }
    });
}


let obtenerTarjetas = async(_id) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-tarjetas/${_id}`,
            responseType: 'json'
        });

        return response.data.usuario.tarjetas;
    } catch (error) {
        console.log(error);
    }
};