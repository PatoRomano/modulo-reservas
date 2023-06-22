const Axios = require('axios')

const getArbitros = async (req,res)  => {
    try {
        const response = await Axios.get('http://192.168.137.114:3001/api/arbitros/');
        const arbitros = response.data; // Datos de la API externa
        
        // Devolver los datos obtenidos al invocador
        res.json(arbitros);
      } catch (error) {
        console.error('Error al consumir la API externa:', error);
        //res.status(500).json({ error: 'Error al obtener los arbitros' });
      }
}

module.exports = {getArbitros}