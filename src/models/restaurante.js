const mongoose = require('mongoose');
const { Schema, model } = mongoose;

//Nombre, Descripción, Dirección, Ciudad, URL foto restaurante
const restauranteSchema = new Schema({
    Nombre: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    Descripcion: {
        type: String,
        required: true
    },
    Direccion: {
        type: String,
        required: true
    },
    Ciudad: {
        type: String,
        required: true
    },
    Url: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'Restaurantes', timestamps: true });

module.exports = model('Restaurante', restauranteSchema);