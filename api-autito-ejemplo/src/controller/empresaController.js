const pool = require('../config/db');

const getEmpresas = async (req,res)  => {
    const response = await pool.query('SELECT * FROM empresa')
    res.status(200).json(response.rows);
}

const setEmpresa = async (req,res)  => {
    const {nombre,cuit,dirección} = req.body;
    const response = await pool.query('INSERT INTO empresa (nombre,cuit,dirección) VALUES ($1, $2, $3)',[nombre,cuit,dirección]);
    res.status(200).json({
        message:'empresa agregada correctamente',
        body:{
            empresa:{nombre,cuit,dirección}
        }
    });    
    console.log(req);
}

module.exports = {getEmpresas,setEmpresa}