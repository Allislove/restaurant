const { Router } = require('express');
const router = Router();

const controller = require('./controller');
const auth = require('../configs/auth');
const checkingUser = require('../middlewares/checkingUser');

//Meto el auth, en un array, para luego meter, mas valores, como lo son el tipo de usuario(Admin/Moderador ..etc)
router.post('/users', [ auth.rutasProtegidas, checkingUser.checkDuplicateNicknameOrEmail ], controller.newUsers)
router.get('/users', [ auth.rutasProtegidas ], controller.users)
router.delete('/users/:id', [ auth.rutasProtegidas ], controller.deleteById);
router.get('/users/:id', [ auth.rutasProtegidas ], controller.getUserById);


module.exports = router;