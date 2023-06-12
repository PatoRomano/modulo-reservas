const pool = require('../config/db');

const getUsers = async (req, res) => {
    const query = 'SELECT * FROM usuarios';
    try{
        const response = await pool.query(query)
        return response.rows;
    }catch{
    }
   
}

const setUser = async (req,res) => {
    const {correo,contraseña,nombre,apellido,id_empresa} = req.body;
    const response = await pool.query('INSERT INTO usuarios (correo,contraseña,nombre,apellido,id_empresa) VALUES ($1, $2, $3, $4, $5)',[correo,contraseña,nombre,apellido,id_empresa]);
    res.status(200).json({
        message:'usuario agregado correctamente',
        body:{
            Tipo:{correo,contraseña,nombre,apellido,id_empresa}
        }
    });    
    console.log(req);  
};

const findOne = async (data) => {
    const query = 'SELECT * from usuarios where correo = $1';
    const values = [data.correo];
    try{
        const response = await pool.query(query,values);

        return response.rows;
    }catch{

    }
}


module.exports = {getUsers, findOne, setUser}