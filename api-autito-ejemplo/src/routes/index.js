const { Router } = require('express');
const router = Router();
const { getUsers, findOne, setUser} = require('../controller/usuario.controller');
const { getTiposDeportes, getTiposDepartamentos, getTiposSalones, getTipos, setTipo} = require('../controller/tipoespacio.controller');
const { getEmpresas,setEmpresa, getEmpresasDeportes, getEmpresasSalones,getEmpresasDepartamentos} = require('../controller/empresaController');
const { getEspacios,setEspacio, getEspacioDeportes, getEspacioFindOne} = require('../controller/espacio.controller');
const { getReservasDeporte,setReservaDeporte} = require('../controller/reserva.controller');
const { getServicios,setServicio} = require('../controller/servicio.controller');
const { getEspacioServicios,setEspacioServicio,espacioServicios,servicioEspacios} = require('../controller/espacioservicio.controller');
//Getters
router.get('/empresas', getEmpresas);
router.get('/espacio', getEspacios);
router.get('/reservas', getReservasDeporte);
router.get('/servicios', getServicios);
router.get('/espacioservicio', getEspacioServicios);

//routes get usuarios
router.get('/usuarios', getUsers);
router.get('/usuario/:id',findOne);

//routes get tipos
router.get('/tipodeportes', getTiposDeportes);
router.get('/tipodepartamentos', getTiposDepartamentos);
router.get('/tiposalones', getTiposSalones);
router.get('/tipo', getTipos);

//routes get espacios
router.get('/espacioDeportes', getEspacioDeportes);

//routes get empresas
router.get('/empresasDeportes', getEmpresasDeportes);
router.get('/empresasSalones', getEmpresasSalones);
router.get('/empresasDepartamentos', getEmpresasDepartamentos);


//SETTERS
router.post('/setEmpresa', setEmpresa);
router.post('/setEspacio', setEspacio);
router.post('/setReserva', setReservaDeporte);
router.post('/setServicio', setServicio);
router.post('/setEspacioServicio', setEspacioServicio);

router.post('/setTipo', setTipo);
router.post('/setUser', setUser);

router.post('/espacioServicios', espacioServicios); //A partir del id de un espacio devuelve los servicios del mismo
router.post('/servicioEspacios', servicioEspacios); //A partir del id de un servicio devuelve los espacios que tienen ese servicio

router.post('/getEspacioFindOne', getEspacioFindOne); //A partir del id de la empresa devuelve el espacio

module.exports = router;