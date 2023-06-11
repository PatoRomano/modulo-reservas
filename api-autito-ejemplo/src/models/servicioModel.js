const pool = require('../config/db');


const setServicios = async (data) => {
    const query = 'INSERT INTO espaciosservicios (id_espacio, id_servicio, descripcion);';
    const values = [data.id_espacio,data.id_servicio,data.descripcion];
    try{
        const result = await pool.query(query,values);
        return result.rows;
    }catch{

    }
}
module.exports = {
    setServicios
}