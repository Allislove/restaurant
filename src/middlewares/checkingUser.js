const User = require('../models/users');

//En mongoose mandara error si el user ya existe!, pero este metodo es mucho mejor para tener todo conciso
//La diferencia es que mando directamente un mensaje json y no el error en consola
const checkDuplicateNicknameOrEmail = async (req, res, next) => {
    try {
      const user = await User.findOne({ cedula: req.body.cedula });
      if (user)
        return res.status(400).json({ message: "The user already exists" });
      const email = await User.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "The email already exists" });
      next();
    } catch (error) {
      res.status(500).json({ message: error });
    }
};


const controller = {
  checkDuplicateNicknameOrEmail
}

module.exports = controller;