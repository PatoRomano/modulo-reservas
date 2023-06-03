const { Router } = require('express');
const router = Router();
const { registerCtrl, loginCtrl } = require('../controller/auth.controller')
//routes get

//routes post
router.post('/register', registerCtrl);
router.get('/login',loginCtrl);


module.exports = router;