const pool = require('../config/db');

const getReservasHorarios = async (req,res)  => {
    const response = await pool.query('SELECT * FROM reservashorarios')
    res.status(200).json(response.rows);
}

const setReservaHorario = async (req,res)  => {
    const {id_reserva,id_horario} = req.body;
    const response = await pool.query('INSERT INTO reservashorarios (id_reserva,id_horario) VALUES ($1, $2)',[id_reserva,id_horario]);
    res.status(200).json({
        message:'reserva horario agregado correctamente',
        body:{
            reserva_horario:{id_reserva,id_horario}
        }
    });    
    console.log(req);
}

module.exports = {getReservasHorarios,setReservaHorario}