const pool = require('../config/db');

const getClientes = async (req,res)  => {
    const response = await pool.query('SELECT * FROM cliente')
    res.status(200).json(response.rows);
}

const getClientePorId = async (req,res)  => {
    const {id_cliente} = req.body;
    const response = await pool.query('SELECT * FROM cliente where id = $1',[id_cliente]);
    res.status(200).json(response.rows);
}

const getClientePorDni = async (req,res)  => {
    const {dni} = req.body;
    const response = await pool.query('SELECT * FROM cliente where dni = $1',[dni]);
    res.status(200).json(response.rows);
}

const setCliente = async (req,res)  => {
    const {nombre, apellido, dni, correo, contacto} = req.body;
    const response = await pool.query('INSERT INTO cliente (nombre, apellido, dni, correo, contacto) VALUES ($1, $2, $3, $4, $5)',[nombre, apellido, dni, correo, contacto]);
    res.status(200).json({
        message:'cliente agregado correctamente',
        body:{
            espacio_servicio:{nombre, apellido, dni, correo, contacto}
        }
    });    
    console.log(req);
}

module.exports = {getClientes,getClientePorId,getClientePorDni,setCliente}