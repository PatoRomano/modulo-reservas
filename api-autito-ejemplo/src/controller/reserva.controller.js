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
    const response = await pool.query('SELECT to_char(hora_inicio, \'HH24:MI\') as hora_inicio FROM reservas WHERE id_espacio = $1 AND fecha_inicio = $2',[id_espacio, fecha])
    res.status(200).json(response.rows);
}

const setReservaDeporte = async (req,res)  => {
    const {id_usuario,id_espacio,fecha,hora_inicio,hora_fin,id_cliente} = req.body;
    var horaInicio = new Date()
    var horaFin = new Date()
    var horario = parseInt(hora_inicio.substring(0,2))
    horaInicio.setHours(horario)
    horario = parseInt(hora_fin.substring(0,2))
    horaFin.setHours(horario)

    var horaActual = new Date()
    horaActual.setHours(horaInicio.getHours()+1)

    while (horaInicio.getHours() < horaFin.getHours()) {
        const response = await pool.query('INSERT INTO reservas (id_usuario,id_espacio,fecha_fin,fecha_inicio,hora_inicio,hora_fin,id_cliente) VALUES ($1, $2, $3, $4, $5, $6, $7)',[id_usuario,id_espacio,fecha,fecha,horaInicio.getHours()+":00:00",horaActual.getHours()+":00:00",id_cliente]);
        horaInicio.setHours(horaInicio.getHours()+1)
        horaActual.setHours(horaActual.getHours()+1)
    }

    res.status(200).json({
        message:'Reserva agregada correctamente',
        body:{
            reserva:{id_usuario,id_espacio,fecha,hora_inicio,hora_fin,id_cliente}
        }
    });    
    console.log(req);
}

const reservarSinIdCliente = async (req,res)  => {
    const {id_usuario,id_espacio,fecha,hora_inicio,hora_fin,nombre, apellido, dni, correo, contacto} = req.body;
    var response = await pool.query('SELECT count(*) FROM cliente where dni = $1',[dni]);
    if (response.rows[0]['count'] == 0){
        pool.query('INSERT INTO cliente (nombre, apellido, dni, correo, contacto) VALUES ($1, $2, $3, $4, $5)',[nombre, apellido, dni, correo, contacto]);
    } 
    response = await pool.query('SELECT * FROM cliente where dni = $1',[dni]);
    id_cliente = response.rows[0]['id']
    
    var horaInicio = new Date()
    var horaFin = new Date()
    var horario = parseInt(hora_inicio.substring(0,2))
    horaInicio.setHours(horario)
    horario = parseInt(hora_fin.substring(0,2))
    horaFin.setHours(horario)

    var horaActual = new Date()
    horaActual.setHours(horaInicio.getHours()+1)

    while (horaInicio.getHours() < horaFin.getHours()) {
        const response = await pool.query('INSERT INTO reservas (id_usuario,id_espacio,fecha_fin,fecha_inicio,hora_inicio,hora_fin,id_cliente) VALUES ($1, $2, $3, $4, $5, $6, $7)',[id_usuario,id_espacio,fecha,fecha,horaInicio.getHours()+":00:00",horaActual.getHours()+":00:00",id_cliente]);
        horaInicio.setHours(horaInicio.getHours()+1)
        horaActual.setHours(horaActual.getHours()+1)
    }

    res.status(200).json({
        message:'Reserva agregada correctamente',
        body:{
            reserva:{id_usuario,id_espacio,fecha,hora_inicio,hora_fin,id_cliente}
        }
    });
}

module.exports = {getReservasDeporte,setReservaDeporte,getReservas,getReservaPorFecha,reservarSinIdCliente}