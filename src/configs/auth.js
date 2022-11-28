const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('../models/users')


const app = express();


//Pasandole la clave secreta a jwt
app.set('secret', config.secret);
const signUp = async (req, res) => {
    try {
      // Getting the Request Body
      const { name, cedula, email, password, realm } = req.body;
      // Creating a new User Object
      const newUser = new User({
        name,
        cedula,
        email,
        password: await User.encryptPassword(password),
        realm,
      });
  
      // Saving the User Object in Mongodb
      const savedUser = await newUser.save();
      console.log(savedUser);
  
      // Create a token
      const token = jwt.sign({ id: savedUser._id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
  
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };


const signIn = async (req, res) => {
    try {
      // Request body email can be an email or username
      const { email, cedula } = req.body
      
      const userFound = await User.findOne({ email }).select("+password") || await User.findOne({ cedula }).select("+password");
  
      if (!userFound) return res.status(400).json({ message: "User Not Found" });
      console.log(userFound);
      //console.log(userFound.password);

      const matchPassword = await User.comparePassword(req.body.password, userFound.password);
      //console.log(matchPassword);

      if (!matchPassword) {
        return res.status(401).json({
          token: null,
          message: "Invalid Password",
        });
      }
        
      const token = jwt.sign({ id: userFound._id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
  
      res.json({ token });
    } catch (error) {
      console.log(error);
    }
};



const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];

    if(token) {
      jwt.verify(token, app.get('secret'), (err, decoded) => {
          console.log(decoded);
          req.userId = decoded.id;
          console.log(req.userId);
            if(err) {
                return res.json({ message: 'Token invalido' });
            }else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({ 
            message: 'Token no proporcionado.'
        });
    };
})


// Proteger rutas, dependiendo de que tipo de usuario es;
const isAdmin = async (req, res, next) => {
  try {
    // se debe de leer el id, para que el luego haga las comparaciones o verifique los campos,
    //Ya que en este caso, al momento de que se llama este metodo, en la solicitud no se pasara un id en especifico
    //Sino que este solamente buscara comparar un usuario..
    
    const user = await User.findById(req.userId);
    //console.log(user);
      if (user.realm === "admin") {
        next();
        return;
      }
    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};


const isModerator = async (req, res, next) => {
  try {
    //Le paso el id, que me retorna el decode, que hace ref a el user.
    const user = await User.findById(req.userId);
    //console.log(user);
    //realm, lo podemos identificar como un RANGO, entre los usuarios, para determinar que cosas podra ver en el sitio
      if (user.realm === "moderator") {
        next();
        return;
      }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};


const controller = {
    rutasProtegidas,
    signUp,
    signIn,
    isAdmin,
    isModerator
};

module.exports = controller;