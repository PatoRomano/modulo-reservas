const pool = require('../config/db');

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

//luego me manda el dia y el horario

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

module.exports = {getReservasDeporte,setReservaDeporte}