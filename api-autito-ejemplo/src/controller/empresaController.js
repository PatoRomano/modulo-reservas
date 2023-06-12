const pool = require('../config/db');

const getEmpresas = async (req,res)  => {
    const response = await pool.query('SELECT * FROM empresa')
    res.status(200).json(response.rows);
}

const getEmpresasDeportes = async (req,res)  => {
    const response = await pool.query('SELECT e.* FROM empresa e INNER JOIN '+
    'espacios es ON es.id_empresa = e.id INNER JOIN tipo_espacio te ON te.id = es.id_tipo WHERE te.id_padre = 1')
    res.status(200).json(response.rows);
}

const getEmpresasDepartamentos = async (req,res)  => {
    const response = await pool.query('SELECT e.* FROM empresa e INNER JOIN '+
    'espacios es ON es.id_empresa = e.id INNER JOIN tipo_espacio te ON te.id = es.id_tipo WHERE te.id = 2')
    res.status(200).json(response.rows);
}

const getEmpresasSalones = async (req,res)  => {
    const response = await pool.query('SELECT e.* FROM empresa e INNER JOIN '+
    'espacios es ON es.id_empresa = e.id INNER JOIN tipo_espacio te ON te.id = es.id_tipo WHERE te.id = 3')
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

module.exports = {getEmpresas,setEmpresa,getEmpresasDeportes,getEmpresasDepartamentos,getEmpresasSalones}