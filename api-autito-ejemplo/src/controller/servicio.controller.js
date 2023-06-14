const pool = require('../config/db');

const getServicios = async (req,res)  => {
    const response = await pool.query('SELECT * FROM servicios')
    res.status(200).json(response.rows);
}

const getServiciosPorTipo = async (req,res)  => {
    const {id_tipo} = req.body;
    const response = await pool.query('SELECT * FROM servicios WHERE id_tipo = $1',[id_tipo])
    res.status(200).json(response.rows);
}

const setServicio = async (req,res)  => {
    const {nombre,descripcion,id_tipo} = req.body;
    const response = await pool.query('INSERT INTO servicios (nombre,descripcion,id_tipo) VALUES ($1, $2)',[nombre,descripcion,id_tipo]);
    res.status(200).json({
        message:'servicio agregado correctamente',
        body:{
            Servicio:{nombre,descripcion,id_tipo}
        }
    });    
    console.log(req);
}

module.exports = {getServicios,setServicio,getServiciosPorTipo}
