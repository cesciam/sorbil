'use strict';


let registrarLibreria = (pimagen, pusuario, pcorreo, pempresa, ptelefono, pdescripcion, pprovincia, pcanton, pdistrito, pdireccion_exacta, pdireccion_latitud, pdireccion_longitud) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrar-libreria',
        responseType: 'json',
        data: {
            //Info de la librería
            imagen: pimagen,
            usuario: pusuario,
            correo: pcorreo,
            empresa: pempresa,
            telefono: ptelefono,
            descripcion: pdescripcion,
            provincia: pprovincia,
            canton: pcanton,
            distrito: pdistrito,
            direccion_exacta: pdireccion_exacta,
            direccion_latitud: pdireccion_latitud,
            direccion_longitud: pdireccion_longitud
        }
    });
};


let registrarAdminLibreria = (pavatar, pcorreo, pcontrasena, pnombre, pprimer_apellido, psegundo_apellido, pid, pfecha, pedad, ptipo_usuario) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrar-usuario',
        responseType: 'json',
        data: {
            //Info del administrador
            avatar: pavatar,
            correo: pcorreo,
            contrasena: pcontrasena,
            nombre: pnombre,
            primer_apellido: pprimer_apellido,
            segundo_apellido: psegundo_apellido,
            id: pid,
            fecha: pfecha,
            edad: pedad,
            tipo_usuario: ptipo_usuario
        }
    });
};

let obtenerLibrerias = async () => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-librerias',
            responseType: 'json'
        });

        return response.data.lista_librerias;
    } catch (error) {
        console.log(error);
    }
};

let obtenerLibreriaid = async (_id) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-libreria-id/${_id}`,
            responseType: 'json'
        });

        return response.data.libreria;
    } catch (error) {
        console.log(error);
    }
};

let obtenerSucursales = async (correo) => {

    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/listar-sucursales/${correo}`,
            responseType: 'json'
        });

        return response.data.libreria[0].sucursales;
    } catch (error) {
        console.log(error);
    }
};

let modificarSucursal = (pcorreo, pdatos) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-sucursal',
        responseType: 'json',
        data: {
            correo: pcorreo,
            datos: pdatos
        }
    });
};

let obtenerDatosCorreo = async (correo) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-libros-libreria/${correo}`,
            responseType: 'json'
        });

        return response.data.libreria[0].libros;
    } catch (error) {
        console.log(error);
    }
};

let obtenerLibreriaPorCorreo = async (correo) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-libreria-por-correo/${correo}`,
            responseType: 'json'
        });

        return response.data.libreria;
    } catch (error) {
        console.log(error);
    }
};

let obtenerSucursalPorCorreo = async (correo) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-sucursal-por-correo/${correo}`,
            responseType: 'json'
        });

        return response.data.libreria[0].sucursales;
    } catch (error) {
        console.log(error);
    }
};


let actualizarLibrosLibreria = (pArrayLibros, pcorreo) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/actualizar-libros-libreria',
        responseType: 'json',
        data: {
            libros: pArrayLibros,
            correo: pcorreo
        }
    });
}

let modificarLibreria = (_id, pimagen, pusuario, pcorreo, pempresa, ptelefono, pdescripcion, pprovincia, pcanton, pdistrito, pdireccion_exacta, pdireccion_latitud, pdireccion_longitud, pavatar, pnombre, pprimer_apellido, psegundo_apellido, pfecha) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar_libreria',
        responseType: 'json',
        data: {
            //Info de la librería
            _id: pid,
            imagen: pimagen,
            usuario: pusuario,
            correo: pcorreo,
            empresa: pempresa,
            telefono: ptelefono,
            descripcion: pdescripcion,
            provincia: pprovincia,
            canton: pcanton,
            distrito: pdistrito,
            direccion_exacta: pdireccion_exacta,
            direccion_latitud: pdireccion_latitud,
            direccion_longitud: pdireccion_longitud,
            //Info del administrador
            avatar: pavatar,
            nombre: pnombre,
            primer_apellido: pprimer_apellido,
            segundo_apellido: psegundo_apellido,
            fecha: pfecha
        }
    });
};