const pool = require('../config/db');

const getEspacios = async (req,res)  => {
    const response = await pool.query('SELECT * FROM espacios')
    res.status(200).json(response.rows);
}

const getEspacioIdEspacio = async (req,res)  => {
    const {id_espacio} = req.body;
    const response = await pool.query('SELECT * as tipo FROM espacios id  = $1',[id_espacio]);
    res.status(200).json(response.rows);
}

const getEspacioFindOne = async (req,res)  => {
    const {id_empresa} = req.body;
    const response = await pool.query('SELECT es.id, es.nombre as nombreespacio, es.precio_hora, '
    +'es.hora_inicio, es.hora_fin, es.descripcion te.nombre as tipo FROM espacios es '
    +'INNER JOIN tipo_espacio as te ON te.id = es.id_tipo '
    +'where te.id_padre = 1 and id_empresa  = $1',[id_empresa]);
    res.status(200).json(response.rows);
}

const getEspacioFindOneSalones = async (req,res)  => {
    const {id_empresa} = req.body;
    const response = await pool.query('SELECT es.id, es.nombre as nombreespacio, es.precio_hora, '
    +'es.hora_inicio, es.hora_fin, es.descripcion, te.nombre as tipo FROM espacios es '
    +'INNER JOIN tipo_espacio as te ON te.id = es.id_tipo '
    +'where te.id_padre = 3 and id_empresa  = $1',[id_empresa]);
    res.status(200).json(response.rows);
}

const getEspacioFindOneDepartamentos = async (req,res)  => {
    const {id_empresa} = req.body;
    const response = await pool.query('SELECT es.id, es.nombre as nombreespacio, es.precio_hora, '
    +'es.hora_inicio, es.hora_fin, es.descripcion, te.nombre as tipo FROM espacios es '
    +'INNER JOIN tipo_espacio as te ON te.id = es.id_tipo '
    +'where te.id_padre = 2 and id_empresa  = $1',[id_empresa]);
    res.status(200).json(response.rows);
}


const getEspacioDeportes = async (req, res) => {
    const query = 'SELECT e.nombre as espacio, tp.nombre as tipo, tp.capacidad, e.precio_hora as precio, e.descripcion  FROM espacios e '+
    'INNER JOIN tipo_espacio tp on tp.id = e.id_tipo where tp.id_padre = 1';
    try {
        const response = await pool.query(query)
        res.status(200).json(response.rows);
    }catch{

    }
}

const getEspacioSalones = async (req, res) => {
    const query = 'SELECT e.nombre as espacio, tp.nombre as tipo, tp.capacidad, e.precio_hora as precio, e.descripcion FROM espacios e '+
    'INNER JOIN tipo_espacio tp on tp.id = e.id_tipo where tp.id_padre = 3';
    try {
        const response = await pool.query(query)
        res.status(200).json(response.rows);
    }catch{

    }
}

const setEspacio = async (req,res)  => {
    const {id_empresa,id_tipo,id_estado,nombre,precio_hora,hora_inicio,hora_fin,descripcion} = req.body;
    const response = await pool.query('INSERT INTO espacios (id_empresa,id_tipo,nombre,precio_hora,hora_inicio,hora_fin,descripcion) VALUES ($1, $2, $3, $4, $5, $6, %7)',[id_empresa,id_tipo,nombre,precio_hora,hora_inicio,hora_fin,descripcion]);
    res.status(200).json({
        message:'espacio agregado correctamente',
        body:{
            espacio:{id_empresa,id_tipo,nombre,precio_hora,hora_inicio,hora_fin,descripcion}
        }
    });    
    console.log(req);
}
const getEspaciosPorEmpresa = async (req, res) => {
    const {id_empresa} = req.body;
    const response = await pool.query('SELECT * FROM espacios WHERE id_empresa = $1',[id_empresa]);
    res.status(200).json(response.rows);    
}
module.exports = {getEspacios,setEspacio, getEspacioDeportes,getEspacioSalones, getEspacioFindOne, getEspaciosPorEmpresa, getEspacioFindOneSalones, getEspacioFindOneDepartamentos};