const pool = require('../config/db');

const getReservas = async (req,res)  => {
    const {id_empresa} = req.body;
    const response = await pool.query('SELECT r.id, es.nombre, r.fecha_fin as fecha, r.hora_inicio, r.hora_fin, c.nombre as nombrecliente, c.apellido as apellidocliente, c.dni as dnicliente FROM reservas r JOIN espacios es ON es.id = r.id_espacio JOIN empresa em ON em.id = es.id_empresa JOIN cliente c ON c.id = r.id_cliente WHERE em.id = $1',[id_empresa])
    res.status(200).json(response.rows);
}

const getReservasDeporte = async (req,res)  => {
    const {id_espacio} = req.body;
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    if(month < 10){
        month = "0"+month.toString()
    }
    let fechaActual = day.toString()+"-"+month.toString()+"-"+year.toString()
    const response = await pool.query('SELECT * FROM reservas WHERE id_espacio = $1 AND fecha_fin >= $2',[id_espacio,fechaActual])
    res.status(200).json(response.rows);
}

const getReservaPorFecha = async (req,res)  => {
    const {id_espacio, fecha} = req.body;
    const response = await pool.query('SELECT hora_inicio FROM reservas WHERE id_espacio = $1 AND fecha_inicio = $2',[id_espacio, fecha])
    res.status(200).json(response.rows);
}

const setReservaDeporte = async (req,res)  => {
    const {id_usuario,id_espacio,fecha_fin,fecha_inicio,hora_inicio,hora_fin} = req.body;
    const response = await pool.query('INSERT INTO reservas (id_usuario,id_espacio,fecha_fin,fecha_inicio,hora_inicio,hora_fin) VALUES ($1, $2, $3, $4, $5, $6)',[id_usuario,id_espacio,fecha_fin,fecha_inicio,hora_inicio,hora_fin]);
    res.status(200).json({
        message:'empresa agregada correctamente',
        body:{
            reserva:{id_usuario,id_espacio,fecha_fin,fecha_inicio,hora_inicio,hora_fin}
        }
    });    
    console.log(req);
}

module.exports = {getReservasDeporte,setReservaDeporte,getReservas,getReservaPorFecha}