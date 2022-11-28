const User = require('../models/users');
//const Reserva = require('../models/reserva');
//const Restaurante = require('../models/restaurante')



const newUsers = async (req, res) => {
    const { name, email, password, cedula } = req.body;

    try {
        const newUser = new User({
            name,
            email,
            password: await User.encryptPassword(password),
            cedula
        })
    
        const userSaved = await newUser.save();
        console.log(userSaved);
        return res.status(200).json({ userSaved })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error })
    }

}

const users = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users })
    } catch (error) {
        return res.status(400).json({ message: 'Error al intentar obtener usuarios'})
    }
}

const getUserById = async(req, res) => {
    try {
        let id = req.params.id;
        const user = await User.findById(id);
        return res.status(200).json({ user })
    } catch (error) {
        console.log(error);
        return error;
    }
}


const deleteById = async (req, res) => {
    try {
        let id = req.params.id;
        const user = await User.findByIdAndDelete(id)
        if(user) {
            return res.status(200).json({ message: 'Usuario eliminado de forma exitosa'})
        }else {
            return res.status(400).json({ message: 'No existe el usuario'});
        }
    }catch(error) {
        return res.status(500).json({ message: 'Imposible realizar la operacion deseada.' })
    }
}



const controller = {
    newUsers,
    users,
    deleteById,
    getUserById

}

module.exports = controller;