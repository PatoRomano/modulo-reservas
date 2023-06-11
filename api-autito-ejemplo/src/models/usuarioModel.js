const pool = require('../config/db');

const getUsers = async (req, res) => {
    const query = 'SELECT * FROM usuarios';
    try{
        const response = await pool.query(query)
        return response.rows;
    }catch{
    }
   
}

const setUser = async (data) => {
    const query = 'INSERT INTO usuarios (correo,contraseña,nombre,apellido,id_empresa) VALUES ($1, $2, $3, $4, $5)';
    const values = [data.correo, data.contraseña, data.nombre, data.apellido, data.id_empresa];
    try {
        const result = await pool.query(query, values);
        console.log('Usuario creado exitosamente');
        return result.rows;
      } catch (error) {
        console.error('Error al crear el usuario', error);
      }
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