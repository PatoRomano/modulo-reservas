const pool = require('../config/db');

const getHorarios = async (req,res)  => {
    const response = await pool.query('SELECT * FROM horarios')
    res.status(200).json(response.rows);
}

const setHorario = async (req,res)  => {
    const {hora_inicio,hora_fin} = req.body;
    const response = await pool.query('INSERT INTO horarios (hora_inicio,hora_fin) VALUES ($1, $2)',[hora_inicio,hora_fin]);
    res.status(200).json({
        message:'horario agregado correctamente',
        body:{
            horario:{hora_inicio,hora_fin}
        }
    });    
    console.log(req);
}

module.exports = {getHorarios,setHorario}