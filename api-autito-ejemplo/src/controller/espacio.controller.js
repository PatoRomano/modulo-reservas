const pool = require('../config/db');

const getEspacios = async (req,res)  => {
    const response = await pool.query('SELECT * FROM espacios')
    res.status(200).json(response.rows);
}

const getEspacioDeportes = async (req, res) => {
    const query = 'SELECT e.nombre as espacio, tp.nombre as tipo, tp.capacidad, e.precio_hora as precio  FROM espacios e '+
    'INNER JOIN tipo_espacio tp on tp.id = e.id_tipo where tp.id_padre = 1';
    try {
        const response = await pool.query(query)
        res.status(200).json(response.rows);
    }catch{

    }
}

const setEspacio = async (req,res)  => {
    const {id_empresa,id_tipo,id_estado,nombre,precio_hora,hora_inicio,hora_fin} = req.body;
    const response = await pool.query('INSERT INTO espacios (id_empresa,id_tipo,nombre,precio_hora,hora_inicio,hora_fin) VALUES ($1, $2, $3, $4, $5, $6)',[id_empresa,id_tipo,nombre,precio_hora,hora_inicio,hora_fin]);
    res.status(200).json({
        message:'espacio agregado correctamente',
        body:{
            espacio:{id_empresa,id_tipo,nombre,precio_hora,hora_inicio,hora_fin}
        }
    });    
    console.log(req);
}

module.exports = {getEspacios,setEspacio, getEspacioDeportes}