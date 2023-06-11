const pool = require('../config/db');

const setEspacios = async (data) => {
    const query = 'INSERT INTO espacios (nombre,precio_hora,hora_inicio,hora_fin,id_tipo,id_empresa)'+
    'VALUES ($1, $2, $3, $4, $5, $6);';

    const values = [data.nombre, data.precio_hora, data.hora_inicio, 
        data.hora_fin, data.id_tipo, data.id_empresa];
    try{
        const result = await pool.query(query,values);
        return result.rows;
    }catch{

    }
}


const getEspacios = async (req, res) => {
    const query = 'SELECT * FROM espacios';
    try{
        const response = await pool.query(query)
        return response.rows;
    }catch{
    }
   
}

const findOneEspacio = async (data) => {
    const query = 'SELECT * from usuarios espacio id = $1';
    const values = [data];
    console.log(data)
    try{
        const response = await pool.query(query,values);
        return response.rows
    }catch{

    }
}


module.exports = {getUsers, findOne}