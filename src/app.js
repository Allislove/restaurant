//import '@babel/polyfill';
const express = require('express');
const morgan = require('morgan')
const database = require('../database');
const user = require('./users/routes');
const restaurante = require('./restaurantes/routes');
const reservas = require('./reservas/routes');
const privateRoutes = require('./routes/auth.routes'); 

const app = express();

//Settings 
const runDatabase = async () => {
    try {
        await database;
    } catch (error) {
        console.log(error);
    }
}

runDatabase();

//Middlewares
app.use(morgan('dev'));
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))
//Le paso el acceso, para poder consumir el api desde el front con React
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next()
  })

//Rutas
app.get('/', (req, res) => { //Ruta inicial API
    res.send('Restaurante API, funcionando.')
});

app.use('/api/v1', user);
app.use('/api/v1', restaurante);
app.use('/api/v1', reservas);
app.use('/api/v1', privateRoutes);




module.exports = app;