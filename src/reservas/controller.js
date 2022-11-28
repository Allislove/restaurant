const Reserva = require('../models/reserva');
const User = require('../models/users');
const Restaurante = require('../models/restaurante');

//No obstante, para tener una relacion perfecta, se deberia de usar JWT, para asi identificar que usuario
//esta haciendo la consulta al endpoint, al momento que crear la oferta, y ahi si ya determinariamos que
//usuario seria el que mando la reserva.
const newReserva = async(req, res) => {
  const { reservaStart, reservaEnd, mesas } = req.body;
  const restaurante_id = await Restaurante.findById(req.params.id);
  //console.log(req);
  try {
    const reserva = new Reserva({
      //Tomo el user, gracias a jwt, que me provee mas facilidad al momento de la AUTH
      userId: req.userId,
      reservaStart,
      reservaEnd,
      restaurantId: restaurante_id,
      mesas
    })

    ///if(reserva <20) {
      const reservaSaved = await reserva.save();
      console.log(reservaSaved);
      return res.status(200).json({ message: reservaSaved})
  //}
    //return res.status(500).json({ message: 'No se pueden crear mas reservas'})
    
  } catch (error) {
    console.log(error);
    
  }
}


const getReservas = async(req, res) => {
  try {
    const reservas = await Reserva.find();
    return res.status(200).json({ reservas })
  } catch (error) {
    console.log(error);
    return error;
  }
}


const getReservaById = async(req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    return res.status(200).json({ reserva })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error })
  }
}


const deleteReserva = async(req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    console.log(reserva);
    return res.status(200).json({ message: 'Reserva eliminada.'})
  } catch (error) {
    console.log(error);
  }
}


const controller = {
    newReserva,
    getReservas,
    deleteReserva,
    getReservaById
}

module.exports = controller;