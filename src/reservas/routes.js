const { Router } = require('express');
const router = Router();

const controller = require('./controller');
const Auth = require('../configs/auth');


router.post('/restaurant/reservar', [ Auth.rutasProtegidas ], controller.newReserva); //Nos sirve la segunda, ya que determinamos a que restaurante estamos haciendo la reserva
router.post('/restaurant/reservar/:id', [ Auth.rutasProtegidas ], controller.newReserva);
router.get('/restaurant/reservar', controller.getReservas);
router.delete('/restaurant/reservar/:id', controller.deleteReserva);
router.get('/restaurant/reserva/:id', controller.getReservaById);







module.exports = router;