'use-strict'
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT;


async function startApp() {
    //Usando asyncronia para codigo mas hermoso.
    await app.listen(PORT || 4900);
    console.log(`Servidor lanzado en puerto: ${PORT}`);
}

startApp();