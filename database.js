const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/restaurante', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error al intentar conectarse a la BD'));
db.once('open', function() {
console.log('Estamos conectados a la BD');
});