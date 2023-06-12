const { Pool } = require("pg");

//conexion a base de datos
const pool =new Pool({
    host:'localhost',
    user:'postgres',
    password:'admin',
    database:'dbsistemareservas',
    port: '5432'
});

module.exports = pool;
