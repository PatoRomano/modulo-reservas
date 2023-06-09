const { Router } = require('express');
const router = Router();
const { getUsers, findOne, setUser} = require('../controller/usuario.controller');
const { getTiposDeportes, getTiposDepartamentos, getTiposSalones, getTipos, setTipo} = require('../controller/tipoespacio.controller');
const { getEmpresas,setEmpresa, getEmpresasDeportes, getEmpresasSalones,getEmpresasDepartamentos,getEmpresasFutbol} = require('../controller/empresaController');
const { getEspacios,setEspacio, getEspacioDeportes,getEspacioSalones, getEspacioFindOne,getEspacioFindOneSalones,getEspacioFindOneDepartamentos, 
        getEspaciosPorEmpresa, getEspacioIdEspacio, updateEspacio, getCanchas, getEspaciosPorEmpresaCancha} = require('../controller/espacio.controller');

const { getReservasDeporte,setReservaDeporte,getReservas,getReservaPorFecha,reservarSinIdCliente,updateEstadoReservaDeporte,reservaTorneo} = require('../controller/reserva.controller');
const { getServicios,setServicio,getServiciosPorTipo} = require('../controller/servicio.controller');
const { getEspacioServicios,setEspacioServicio,espacioServicios,servicioEspacios} = require('../controller/espacioservicio.controller');
const { getClientes,getClientePorId,getClientePorDni,setCliente} = require('../controller/cliente.controller');
const { getArbitros} = require('../controller/arbitros.controller');
const { getTorneos} = require('../controller/torneos.controller');

//Getters
router.get('/empresas', getEmpresas);
router.get('/espacio', getEspacios);
router.post('/reservasDeportes', getReservasDeporte);
router.post('/reservas', getReservas);
router.get('/servicios', getServicios);
router.get('/espacioservicio', getEspacioServicios);
router.get('/clientes', getClientes);
router.get('/getArbitros', getArbitros);
router.get('/getTorneos', getTorneos);

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
router.get('/espacioSalones', getEspacioSalones);

router.post('/espaciosEmpresa', getEspaciosPorEmpresa)
//routes get empresas
router.get('/empresasDeportes', getEmpresasDeportes);
router.get('/empresasSalones', getEmpresasSalones);
router.get('/empresasDepartamentos', getEmpresasDepartamentos);
router.get('/empresasFutbol', getEmpresasFutbol);

//SETTERS
router.post('/setEmpresa', setEmpresa);
router.post('/setEspacio', setEspacio);
router.post('/setReserva', setReservaDeporte);
router.post('/getReservaPorFecha', getReservaPorFecha);
router.post('/setServicio', setServicio);
router.post('/getServiciosPorTipo', getServiciosPorTipo);
router.post('/setEspacioServicio', setEspacioServicio);

router.post('/setTipo', setTipo);
router.post('/setUser', setUser);

router.post('/espacioServicios', espacioServicios); //A partir del id de un espacio devuelve los servicios del mismo
router.post('/servicioEspacios', servicioEspacios); //A partir del id de un servicio devuelve los espacios que tienen ese servicio
router.post('/updateEspacio', updateEspacio);

router.post('/getEspacioIdEspacio', getEspacioIdEspacio);
router.post('/getEspacioFindOne', getEspacioFindOne);
router.post('/getEspacioFindOneSalones', getEspacioFindOneSalones); //A partir del id de la empresa devuelve el espacio
router.post('/getEspacioFindOneDepartamentos', getEspacioFindOneDepartamentos);
router.post('/getClientePorId', getClientePorId);
router.post('/getClientePorDni', getClientePorDni);
router.post('/setCliente', setCliente);
router.post('/reservarSinIdCliente', reservarSinIdCliente);
router.post('/updateEstadoReservaDeporte', updateEstadoReservaDeporte);
router.post('/reservaTorneo', reservaTorneo);

router.post('/canchas', getCanchas);
router.post('/espacios', getEspaciosPorEmpresaCancha);

module.exports = router;