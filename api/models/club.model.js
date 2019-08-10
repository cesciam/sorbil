'use-strict';

const mongoose = require('mongoose');

//Esquema del registro del club presencial

let club_schema = new mongoose.Schema({
    imagen: { type: String, required: false, unique: false },
    tipo: { type: String, required: false, unique: false },
    nombre: { type: String, required: true, unique: false },
    tema: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    categoria: { type: String, required: true, unique: false },
    genero: { type: String, required: true, unique: false },
    fecha: { type: Date, required: true, unique: false },
    descripcion: { type: String, required: true, unique: false },
    usuarios: [{
        usuario_id: { type: String, required: true, unique: true },
        nombre: { type: String, required: true, unique: false },
        correo: { type: String, required: true, unique: false }
    }],
    //Solamente para el club presencial
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    direccion_exacta: { type: String, required: false, unique: false },
});

module.exports = mongoose.model('Club', club_schema);