const pool = require('../config/db');

const getTiposDeportes = async (req, res) => {
    const query = 'SELECT * FROM tipo_espacio where id_padre = 1 ';
    try{
        const response = await pool.query(query)
        return response.rows;
    }catch{
    }
   
}

const getTipos = async (req, res) => {
    const query = 'SELECT * FROM tipo_espacio where id <> 1';
    try{
        const response = await pool.query(query)
        return response.rows;
    }catch{
    }
   
}

module.exports = {
    getTiposDeportes,
    getTipos
}