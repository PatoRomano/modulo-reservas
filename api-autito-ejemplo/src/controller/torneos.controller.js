const Axios = require('axios')

const getTorneos = async (req,res)  => {
    try {
        const response = await Axios.get('http://localhost:3002/api/torneos/');
        const torneos = response.data; // Datos de la API externa
        
        // Devolver los datos obtenidos al invocador
        res.json(torneos);
      } catch (error) {
        console.error('Error al consumir la API externa:', error);
        res.status(500).json({ error: 'Error al obtener los torneos' });
      }
}

module.exports = {getTorneos}