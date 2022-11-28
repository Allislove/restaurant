const Restaurante = require('../models/restaurante');


//Nombre, Descripción, Dirección, Ciudad
const newRestaurant = async (req, res) => {
    try {
        const { Nombre, Descripcion, Direccion, Ciudad, Url } = req.body;
        const restaurante = new Restaurante({
            Nombre,
            Descripcion,
            Direccion,
            Ciudad,
            Url

        });
    
        const restauranteSaved = await restaurante.save();
        console.log(restauranteSaved);
        return res.status(200).json({ restauranteSaved });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Imposible crear restaurante'})
    }

};

const restaurants = async (req, res) => {
    try {
        //const restaurantes = await Restaurante.find();
        const restaurantes = await Restaurante.find({}, null, {sort: {Nombre: 1}}, function (err, restaurantes) {
            if (err) {
                console.log(err);
            }
            //console.log(restaurantes);
            //Lo mando directo, para poder leerlo en el front bien
            return res.status(200).json(restaurantes)
        });
        return //ojo. revisar luego-
    } catch (error) {
        return res.status(400).json({ message: 'Imposible listar restaurantes'})
    }
}


const updateRestaurant = async(req, res) => {
    try {
        const { Nombre, Descripcion, Direccion, Ciudad, Url } = req.body;
        let id = req.params.id;
        const restaurante = await Restaurante.findOneAndUpdate(id, {
            Nombre,
            Descripcion,
            Direccion,
            Ciudad,
            Url
        })

        const savedRestaurant = await restaurante.save();
        //console.log(savedRestaurant);
        return res.status(200).json({ message: 'Restaurante actualizado.'})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error})
    }
}



const deleteRestaurant = async (req, res) => {
    try {
        let id = req.params.id;
        const restaurante = await Restaurante.findByIdAndDelete(id);
        if(restaurante) return res.status(200).json({ message: 'Restaurante eliminado satisfactoriamente.'})
        return res.status(200).json({ message: 'No existe el restaurante'})
    } catch (error) {
        return res.status(500).json({ message: 'No ha sido posible ejecutar esta acción!'})        
    }
}


/* const reservaUser = async(req, res) => {
    const restauranteId = Restaurante.findById();

    const reserva = 
}
 */


const controller = {
    newRestaurant,
    restaurants,
    updateRestaurant,
    deleteRestaurant
}

module.exports = controller;