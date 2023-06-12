const pool = require('../config/db');

const getReservas = async (req,res)  => {
    const response = await pool.query('SELECT * FROM reservas')
    res.status(200).json(response.rows);
}

const setReserva = async (req,res)  => {
    const {id_usuario,id_espacio,fecha_fin,fecha_inicio} = req.body;
    const response = await pool.query('INSERT INTO reservas (id_usuario,id_espacio,fecha_fin,fecha_inicio) VALUES ($1, $2, $3, $4)',[id_usuario,id_espacio,fecha_fin,fecha_inicio]);
    res.status(200).json({
        message:'empresa agregada correctamente',
        body:{
            reserva:{id_usuario,id_espacio,fecha_fin,fecha_inicio}
        }
    });    
    console.log(req);
}

module.exports = {getReservas,setReserva}