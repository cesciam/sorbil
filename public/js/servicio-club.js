'use strict';

let registrarClub = (pimagen, ptipo, pnombre, ptema, pcorreo, ptelefono, pcategoria, pgenero, pfecha, pdescripcion, pprovincia, pcanton, pdistrito, pdireccion_exacta) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrar-club',
        responseType: 'json',
        data: {
            imagen:pimagen,
            tipo: ptipo,
            nombre: pnombre,
            tema: ptema,
            correo: pcorreo,
            telefono: ptelefono,
            categoria: pcategoria,
            genero: pgenero,
            fecha: pfecha,
            descripcion: pdescripcion,
            provincia: pprovincia,
            canton: pcanton,
            distrito: pdistrito,
            direccion_exacta: pdireccion_exacta
        }
    });
};

let obtenerClubes = async () => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-clubes',
            responseType: 'json'
        });

        return response.data.lista_clubes;
    } catch (error) {
        console.log(error);
    }
};

let obtenerClubid = async (_id) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-club-id/${_id}`,
            responseType: 'json'
        });

        return response.data.club;
    } catch (error) {
        console.log(error);
    }
};

let registrarUsuarioAlClub = (pid_club, pidusuario, pnombre, pcorreo) =>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/agregar-usuario-club',
        responseType: 'json',
        data: {
            _id: pid_club,
            usuario_id: pidusuario,
            nombre: pnombre,
            correo: pcorreo
        }
    });
};
