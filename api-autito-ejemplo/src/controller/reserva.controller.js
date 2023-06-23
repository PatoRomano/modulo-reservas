const pool = require('../config/db');
const Axios = require('axios')

const getReservas = async (req,res)  => {
    const {id_empresa} = req.body;
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let fechaActual = day.toString()+"-"+month.toString()+"-"+year.toString()
    const response = await pool.query('SELECT r.id, es.nombre, r.fecha_fin as fecha, r.hora_inicio, r.hora_fin, r.estado, r.descripcion, c.nombre as nombrecliente, c.apellido as apellidocliente, c.dni as dnicliente FROM reservas r JOIN espacios es ON es.id = r.id_espacio JOIN empresa em ON em.id = es.id_empresa JOIN cliente c ON c.id = r.id_cliente WHERE em.id = $1 and r.fecha_fin >= $2 order by r.fecha_fin desc',[id_empresa,fechaActual])
    res.status(200).json(response.rows);
}

const updateEstadoReservaDeporte = async (req,res)  => {
    const {id_reserva,id_usuario,flag} = req.body;
    if (flag == 0) {
        const response = await pool.query('UPDATE reservas SET id_usuario=$1, estado=$3 WHERE id=$2',[id_usuario,id_reserva,"RECHAZADA"])    
    } else if (flag == 1) {
        const response = await pool.query('UPDATE reservas SET id_usuario=$1, estado=$3 WHERE id=$2',[id_usuario,id_reserva,"ACEPTADA"]) 
    } else {
        const response = await pool.query('UPDATE reservas SET id_usuario=$1, estado=$3 WHERE id=$2',[id_usuario,id_reserva,"FINALIZADA"]) 
    }
    res.status(200).json({
        message:'Reserva actualizada correctamente',
        body:{
            reserva:{id_reserva,id_usuario,flag}
        }
    });
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
    const response = await pool.query('SELECT * FROM reservas WHERE estado = $3 AND id_espacio = $1 AND fecha_fin >= $2',[id_espacio,fechaActual,"ACEPTADA"])
    res.status(200).json(response.rows);
}

const getReservaPorFecha = async (req,res)  => {
    const {id_espacio, fecha} = req.body;
    const response = await pool.query('SELECT to_char(hora_inicio, \'HH24:MI\') as hora_inicio FROM reservas WHERE estado = $3 AND id_espacio = $1 AND fecha_inicio = $2',[id_espacio, fecha,"ACEPTADA"])
    res.status(200).json(response.rows);
}

const setReservaDeporte = async (req,res)  => {
    const {id_usuario,id_espacio,fecha,hora_inicio,hora_fin,id_cliente} = req.body;
    let horaInicio = new Date()
    let horaFin = new Date()
    let horario = parseInt(hora_inicio.substring(0,2))
    horaInicio.setHours(horario)
    horario = parseInt(hora_fin.substring(0,2))
    horaFin.setHours(horario)

    let horaActual = new Date()
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
    const {id_espacio,fecha,hora_inicio,hora_fin,nombre, apellido, dni, correo, contacto, descripcion} = req.body;
    var response = await pool.query('SELECT count(*) FROM cliente where dni = $1',[dni]);
    if (response.rows[0]['count'] == 0){
        pool.query('INSERT INTO cliente (nombre, apellido, dni, correo, contacto) VALUES ($1, $2, $3, $4, $5)',[nombre, apellido, dni, correo, contacto]);
    } 
    response = await pool.query('SELECT * FROM cliente where dni = $1',[dni]);
    id_cliente = response.rows[0]['id']

    let espacio = await pool.query('SELECT * FROM espacios where id = $1',[id_espacio]);
    let empresa = await pool.query('SELECT telefono FROM empresa where id = ' +espacio.rows[0]['id_empresa']);
    let horaInicio = new Date()
    let horaFin = new Date()
    let horario = parseInt(hora_inicio.substring(0,2))
    horaInicio.setHours(horario)
    horario = parseInt(hora_fin.substring(0,2))
    horaFin.setHours(horario)

    let horaActual = new Date()
    horaActual.setHours(horaInicio.getHours()+1)
    if(espacio.rows[0]['id_tipo'] == 3 || espacio.rows[0]['id_tipo'] == 2){
        const response = await pool.query('INSERT INTO reservas (id_espacio,fecha_fin,fecha_inicio,hora_inicio,hora_fin,id_cliente,estado, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)',[id_espacio,fecha,fecha,hora_inicio,hora_fin,id_cliente,"PENDIENTE",descripcion]);
    }else{
        while (horaInicio.getHours() <= horaFin.getHours()) {
            const response = await pool.query('INSERT INTO reservas (id_espacio,fecha_fin,fecha_inicio,hora_inicio,hora_fin,id_cliente,estado, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',[id_espacio,fecha,fecha,horaInicio.getHours()+":00:00",horaActual.getHours()+":00:00",id_cliente,"PENDIENTE",descripcion]);
            horaInicio.setHours(horaInicio.getHours()+1)
            horaActual.setHours(horaActual.getHours()+1)
        }
    }

    // console.log(empresa.rows)
    
       llamadoWpp = await Axios({
           url: `http://localhost:3001/lead`,
           method: "POST",
           data: {"message":
           "RESERVA SOLICITADA:"+
           "\n\nEspacio = "+espacio.rows[0]['nombre']+
           "\nFecha = "+fecha+
           "\nHora_inicio = "+hora_inicio+
           "\nHora_fin = "+horaActual.getHours()+":"+horaActual.getMinutes()+":"+horaActual.getSeconds()+
           "\nNombre = "+nombre+
           "\nApellido = "+apellido+
           "\nDni = "+dni+
           "\nCorreo = "+correo+
           "\nContacto = "+contacto,
           "phone":empresa.rows[0]['telefono']}
       })

     res.status(200).json({
        message:'Reserva agregada correctamente',
         body:{
             reserva:{id_espacio,fecha,hora_inicio,hora_fin,nombre, apellido, dni, correo, contacto}
         }
     });
}

const reservaTorneo = async (req,res)  => {
    const {id_espacio,dias,nombre, apellido, dni, correo, contacto} = req.body;
    var response = await pool.query('SELECT count(*) FROM cliente where dni = $1',[dni]);
    if (response.rows[0]['count'] == 0){
        pool.query('INSERT INTO cliente (nombre, apellido, dni, correo, contacto) VALUES ($1, $2, $3, $4, $5)',[nombre, apellido, dni, correo, contacto]);
    } 
    response = await pool.query('SELECT * FROM cliente where dni = $1',[dni]);
    id_cliente = response.rows[0]['id']

    let espacio = await pool.query('SELECT * FROM espacios where id = $1',[id_espacio]);
    let empresa = await pool.query('SELECT telefono FROM empresa where id = ' +espacio.rows[0]['id_empresa']);

    let texto = ""

    for (let i = 0; i < dias.length; i++) {
        texto += "Fecha "+dias[i]['dia']+" Horarios: "
        for (let j = 0; j < dias[i]['horarios'].length; j++) {
            let horaInicio = new Date()
            let horaFin = new Date()
            let horario = parseInt(dias[i]['horarios'][j].substring(0,2))
            horaInicio.setHours(horario)
            horaFin.setHours(horaInicio.getHours()+1)
            const response = await pool.query('INSERT INTO reservas (id_espacio,fecha_fin,fecha_inicio,hora_inicio,hora_fin,id_cliente,estado) VALUES ($1, $2, $3, $4, $5, $6, $7)',[id_espacio,dias[i]['dia'],dias[i]['dia'],horaInicio.getHours()+":00:00",horaFin.getHours()+":00:00",id_cliente,"PENDIENTE"]);
            texto += horaInicio.getHours()+":00:00, "
        }
        texto += "\n"
    }
    
      llamadoWpp = await Axios({
          url: `http://localhost:3001/lead`,
          method: "POST",
          data: {"message":
          "RESERVA SOLICITADA PARA TORNEO:"+
          "\n\nEspacio = "+espacio.rows[0]['nombre']+
          "\n\n"+texto+
          "\nNombre = "+nombre+
          "\nApellido = "+apellido+
          "\nDni = "+dni+
          "\nCorreo = "+correo+
          "\nContacto = "+contacto,
          "phone":empresa.rows[0]['telefono']}
      })

     res.status(200).json({
        message:'Reserva agregada correctamente',
        //  body:{
        //      reserva:{id_espacio,fecha,hora_inicio,hora_fin,nombre, apellido, dni, correo, contacto}
        //  }
     });
}
const updateEstadoReservasEstado = async (req,res)  => {
    const response = await pool.query("UPDATE reservas"+
    "SET estado = 'FINALIZADA'" +
    "WHERE (fecha_fin < CURRENT_DATE OR (fecha_fin = CURRENT_DATE AND hora_fin <= CURRENT_TIME))" +
    "and estado = 'ACEPTADA';")
    res.status(200).json({
        message:'Reservas actualizadas correctamente',
        body:{
            reserva:{id_reserva,id_usuario,flag}
        }
    });
}

module.exports = {getReservasDeporte,setReservaDeporte,getReservas,getReservaPorFecha,reservarSinIdCliente,updateEstadoReservaDeporte,reservaTorneo}