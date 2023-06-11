const { Router } = require('express');
const router = Router();
const { getUsers, findOne } = require('../controller/usuario.controller');
const { getTiposDeportes, getTipos } = require('../controller/tipoespacio.controller');
//routes get usuarios
router.get('/usuarios', getUsers);
router.get('/usuario/:id',findOne)
//routes get tipos
router.get('/tipodeportes', getTiposDeportes);
router.get('/tipo', getTipos);

module.exports = router;