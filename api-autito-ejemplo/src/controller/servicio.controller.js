const pool = require('../config/db');

const getServicios = async (req,res)  => {
    const response = await pool.query('SELECT * FROM servicios')
    res.status(200).json(response.rows);
}

const setServicio = async (req,res)  => {
    const {nombre,descripcion} = req.body;
    const response = await pool.query('INSERT INTO servicios (nombre,descripcion) VALUES ($1, $2)',[nombre,descripcion]);
    res.status(200).json({
        message:'servicio agregado correctamente',
        body:{
            Servicio:{nombre,descripcion}
        }
    });    
    console.log(req);
}

module.exports = {getServicios,setServicio}
