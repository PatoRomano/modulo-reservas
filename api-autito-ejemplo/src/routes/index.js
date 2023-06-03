const { Router } = require('express');
const router = Router();
const { getCars, setCar, getClients, setClient, getSells, setSell } = require('../controller/index.controller')
const { getUsers } = require('../models/userModel')
//routes get
router.get('/users', getUsers);
router.get('/cars', getCars);
router.get('/clients', getClients);
router.get('/sells',getSells);
//routes post
router.post('/setCar', setCar);
router.post('/setClient',setClient);
router.post('/setSell',setSell);


module.exports = router;