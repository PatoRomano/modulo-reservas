
const { Pool } = require('pg');

//conexion a base de datos
const pool =new Pool({
    host:'192.168.100.47',
    user:'denis',
    password:'1234',
    database:'dbcars',
    port:'5432'
});

module.exports = pool;