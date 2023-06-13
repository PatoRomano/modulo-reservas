const pool = require('../config/db');

const getReservasHorarios = async (req,res)  => {
    const response = await pool.query('SELECT * FROM reservashorarios')
    res.status(200).json(response.rows);
}

const reservaHorarios = async (req,res)  => {
    const {id_reserva} = req.body;
    const response = await pool.query('SELECT rh.id, rh.id_horario, h.hora_inicio, h.hora_fin FROM reservashorarios rh join horarios h on h.id = rh.id_horario where rh.id_reserva = $1',[id_reserva]);
    res.status(200).json(response.rows);
}

const horarioReservas = async (req,res)  => {
    const {id_horario} = req.body;
    const response = await pool.query('SELECT rh.id as id, rh.id_reserva, r.id_usuario, u.nombre as nombreusuario, u.apellido, r.id_espacio, e.nombre as nombreempresa, e.hora_inicio, e.hora_fin, r.fecha_fin, r.fecha_inicio FROM reservashorarios rh join reservas r on r.id = rh.id_reserva join usuarios u on u.id = r.id_usuario join espacios e on e.id = r.id_espacio where rh.id_horario = $1',[id_horario]);
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

module.exports = {getReservasHorarios,setReservaHorario,reservaHorarios,horarioReservas}