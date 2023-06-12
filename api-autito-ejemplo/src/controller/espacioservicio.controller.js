const pool = require('../config/db');

const getEspacioServicios = async (req,res)  => {
    const response = await pool.query('SELECT * FROM espacioservicios')
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

module.exports = {getEspacioServicios,setEspacioServicio}