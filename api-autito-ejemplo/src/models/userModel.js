const pool = require('../config/db');

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users')
    res.status(200).json(response.rows);
}

const findOne = async (data) => {
    const query = 'SELECT * from users where email = $1';
    const values = [data.email];
    try{
        const res = await pool.query(query,values);
        console.log(res);
        res.status(200).json(res.rows);
    }catch{

    }
}

const setUser = async (data) => {
    const query = 'INSERT INTO users (email,password,name,lastname) VALUES ($1, $2, $3, $4)';
    const values = [data.email, data.password, data.name, data.lastname];
    try {
        const result = await pool.query(query, values);
        console.log('Usuario creado exitosamente');
      } catch (error) {
        console.error('Error al crear el usuario', error);
      }
};
module.exports = {getUsers, setUser, findOne}