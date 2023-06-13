const pool = require('../config/db');

const getEspacioServicios = async (req,res)  => {
    const response = await pool.query('SELECT * FROM espacioservicios')
    res.status(200).json(response.rows);
}

const espacioServicios = async (req,res)  => {
    const {id_espacio} = req.body;
    const response = await pool.query('SELECT es.id as idservesp, es.descripcion as descripcionservesp, s.id as idservicio, s.nombre as nombreservicio, s.descripcion as descripcionservicio FROM espacioservicios es join servicios s on s.id = es.id_servicio where es.id_espacio = $1',[id_espacio]);
    res.status(200).json(response.rows);
}

const servicioEspacios = async (req,res)  => {
    const {id_servicio} = req.body;
    const response = await pool.query('SELECT es.id, es.descripcion, es.id_servicio, s.nombre, s.descripcion as descripcionservicio FROM espacioservicios es join servicios s on s.id = es.id_servicio where es.id_servicio = $1',[id_servicio]);
    res.status(200).json(response.rows);
}

const setEspacioServicio = async (req,res)  => {
    const {id_servicio,id_espacio,descripcion} = req.body;
    const response = await pool.query('INSERT INTO espacioservicios (id_servicio,id_espacio,descripcion) VALUES ($1, $2, $3)',[id_servicio,id_espacio,descripcion]);
    res.status(200).json({
        message:'espacio servicio agregado correctamente',
        body:{
            espacio_servicio:{id_servicio,id_espacio,descripcion}
        }
    });    
    console.log(req);
}

module.exports = {getEspacioServicios,setEspacioServicio,espacioServicios,servicioEspacios}