const Axios = require("axios");
const pool = require("../config/db");

const getTorneos = async (req, res) => {
  try {
    const response = await Axios.get(
      "http://192.168.149.209:3001/api/torneos/"
    );
    const torneos = response.data; // Datos de la API externa
    console.log(torneos.torneos[0].sede_id);
    for (let i = 0; i <= torneos.torneos.length-1; i++) {
      const empresa = await pool.query(
      "SELECT nombre FROM empresa WHERE id = $1",[torneos.torneos[i].sede_id]);
      torneos.torneos[i]["empresa"] = empresa.rows[0].nombre;
    }
    res.json(torneos.torneos);
  } catch (error) {
    console.error("Error al consumir la API externa:", error);
    res.status(500).json({ error: "Error al obtener los torneos" });
  }
};

module.exports = { getTorneos };
