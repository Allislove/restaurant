const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const reservaSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Usuario'},
    reservaStart: {
        type: Date,
        default: Date.now
    },
    reservaEnd: {
        type: Date
    },
    mesas: {
        type: Number,
        default: 15,
        max: 15
    },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurante' }
}, { collection: 'Reservas', timestamps: true });

module.exports = model('Reserva', reservaSchema);



/* 
    status: {type: String, required: true, enum: ['Disponible', 'Reservada'], default: 'Disponible'},
    restaurante: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurante'
    },
        date: {
        type: Date,
        default: Date.now
    },
*/