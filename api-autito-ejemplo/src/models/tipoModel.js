const pool = require('../config/db');

const getTiposDeportes = async (req, res) => {
    const query = 'SELECT * FROM tipo_espacio where id_padre = 1 ';
    try{
        const response = await pool.query(query)
        return response.rows;
    }catch{
    }
   
}

const getTiposDepartamentos = async (req, res) => {
    const query = 'SELECT * FROM tipo_espacio where id_padre = 2 ';
    try{
        const response = await pool.query(query)
        return response.rows;
    }catch{
    }
   
}

const getTiposSalones = async (req, res) => {
    const query = 'SELECT * FROM tipo_espacio where id_padre = 3 ';
    try{
        const response = await pool.query(query)
        return response.rows;
    }catch{
    }
   
}

const getTipos = async (req, res) => {
    //const query = 'SELECT * FROM tipo_espacio where id <> 1';
    const query = 'SELECT * FROM tipo_espacio where id = 1 or id = 2 or id = 3 order by id';
    try{
        const response = await pool.query(query)
        return response.rows;
    }catch{
    }
   
}

const setTipo = async (req,res)  => {
    const {nombre,capacidad,descripcion,id_padre} = req.body;
    const response = await pool.query('INSERT INTO tipo_espacio (nombre,capacidad,descripcion,id_padre) VALUES ($1, $2, $3, $4)',[nombre,capacidad,descripcion,id_padre]);
    res.status(200).json({
        message:'tipo agregado correctamente',
        body:{
            Tipo:{nombre,capacidad,descripcion,id_padre}
        }
    });    
    console.log(req);
}

module.exports = {
    getTiposDeportes,
    getTiposDepartamentos,
    getTiposSalones,
    getTipos,
    setTipo
}