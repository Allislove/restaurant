const { Router } = require('express');
const router = Router();
const auth = require('../configs/auth');
const checkUser = require('../middlewares/checkingUser');


router.post('/signin', auth.signIn);
//router.post('/login');
router.post('/signup', checkUser.checkDuplicateNicknameOrEmail, auth.signUp)





module.exports = router;
