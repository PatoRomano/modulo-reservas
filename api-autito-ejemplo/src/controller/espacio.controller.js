const pool = require('../config/db');

const getEspacios = async (req,res)  => {
    const response = await pool.query('SELECT * FROM espacios')
    res.status(200).json(response.rows);
}

const updateEspacio = async (req,res)  => {
    const {id_espacio,nombre,hora_inicio,hora_fin,descripcion,precio_hora,id_estado} = req.body;
    const response = await pool.query('UPDATE espacios SET nombre=$2, hora_inicio=$3, hora_fin=$4, descripcion=$5, precio_hora=$6, id_estado=$7 WHERE id=$1',[id_espacio,nombre,hora_inicio,hora_fin,descripcion,precio_hora,id_estado])    
    res.status(200).json({
        message:'Espacio actualizado correctamente',
        body:{
            reserva:{id_espacio,nombre,hora_inicio,hora_fin,descripcion,precio_hora,id_estado}
        }
    });
}

const getEspaciosPorEmpresaCancha = async (req,res)  => {
    const {id_empresa,id_tipo} = req.body;
    const response = await pool.query('select * from espacios e where id_empresa = $1 and id_tipo = $2',[id_empresa,id_tipo]);
    res.status(200).json(response.rows);
}

const getEspacioIdEspacio = async (req,res)  => {
    const {id_espacio} = req.body;
    const response = await pool.query('SELECT * FROM espacios WHERE id = $1',[id_espacio]);
    res.status(200).json(response.rows);
}

const getCanchas = async (req,res)  => {
    const {id_espacio} = req.body;
    const response = await pool.query('select distinct te.nombre,te.id from espacios e inner join tipo_espacio te on te.id = e.id_tipo where te.id_padre = 1 and id_empresa = $1',[id_espacio]);
    res.status(200).json(response.rows);
}

const getEspacioFindOne = async (req,res)  => {
    const {id_empresa} = req.body;
    const response = await pool.query('SELECT es.id, es.nombre as nombreespacio, es.precio_hora, '
    +'es.hora_inicio, es.hora_fin, es.descripcion, te.nombre as tipo FROM espacios es '
    +'INNER JOIN tipo_espacio as te ON te.id = es.id_tipo '
    +'where te.id_padre = 1 and es.id_estado = 1 and id_empresa  = $1',[id_empresa]);
    res.status(200).json(response.rows);
}

const getEspacioFindOneSalones = async (req,res)  => {
    const {id_empresa} = req.body;
    const response = await pool.query('SELECT es.id, es.nombre as nombreespacio, es.precio_hora, '
    +'es.hora_inicio, es.hora_fin, es.descripcion, te.nombre as tipo FROM espacios es '
    +'INNER JOIN tipo_espacio as te ON te.id = es.id_tipo '
    +'where te.id = 3 and es.id_estado = 1 and id_empresa  = $1',[id_empresa]);
    res.status(200).json(response.rows);
}

const getEspacioFindOneDepartamentos = async (req,res)  => {
    const {id_empresa} = req.body;
    const response = await pool.query('SELECT es.id, es.nombre as nombreespacio, es.precio_hora, '
    +'es.hora_inicio, es.hora_fin, es.descripcion, te.nombre as tipo FROM espacios es '
    +'INNER JOIN tipo_espacio as te ON te.id = es.id_tipo '
    +'where te.id = 2 and es.id_estado = 1 and id_empresa  = $1',[id_empresa]);
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
    const {id_empresa,id_tipo,nombre,precio_hora,hora_inicio,hora_fin,descripcion} = req.body;
    console.log(req.body)
    const response = await pool.query('INSERT INTO espacios (id_empresa,id_tipo,nombre,precio_hora,hora_inicio,hora_fin,descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7)',[id_empresa,id_tipo,nombre,precio_hora,hora_inicio,hora_fin,descripcion]);
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
module.exports = {getEspacios,setEspacio, getEspacioDeportes,getEspacioSalones, getEspacioFindOne, getEspaciosPorEmpresa, getEspacioFindOneSalones, getEspacioFindOneDepartamentos, getEspacioIdEspacio, updateEspacio, getCanchas, getEspaciosPorEmpresaCancha};