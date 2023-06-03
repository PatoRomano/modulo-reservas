const pool = require('../config/db');



const getCars = async (req, res) => {
    const response = await pool.query('SELECT * FROM cars')
    res.status(200).json(response.rows);
}

const setCar = async (req, res) => {
    const { patente, model, color } = req.body;
    const response = await pool.query('INSERT INTO cars (patente,model,color) VALUES ($1, $2, $3)',[patente,model,color]);
    res.status(200).json({
        message:'auto agregado correctamente',
        body:{
            car:{patente, model, color}
        }
    });    
    console.log(req);
}
const getClients = async (req, res) => {
    const response = await pool.query('SELECT * FROM clients')
    res.status(200).json(response.rows);
}

const setClient = async (req, res) => {
    const { name, lastname, idNumber } = req.body;
    const response = await pool.query('INSERT INTO clients (name,lastname,idnumber) VALUES ($1, $2, $3)',[name,lastname,idNumber]);
    res.status(200).json({
        message:'cliente agregado correctamente',
        body:{
            client:{name, lastname, idNumber}
        }
    });    
}

const setSell = async (req, res) => {
    const {idclient, idcar} = req.body;
    // console.log(idnumber)
    // const idClient = await pool.query('SELECT id FROM clients where idnumber = $1',[idnumber]);
    // console.log("pase; " + idClient);
    // const idCar = await pool.query('SELECT id FROM cars where patente = $1',[patente]);
    const response = await pool.query('INSERT INTO client_car (id_client,id_car) VALUES ($1, $2)',[idclient,idcar]);
    res.status(200).json({
        message:'venta concretada',
        body:{
            sell:{idclient, idcar}
        }
    });    
}

const getSells = async (req, res) => {
    const response = await pool.query('SELECT c.name, c.lastname, c.idnumber, a.patente ,a.model, a.color FROM client_car as ccar INNER JOIN cars as a ON ccar.id_car = a.id INNER JOIN clients as c ON ccar.id_client = c.id')
    //console.log(response.rows);
    // res.send('cars');
    res.status(200).json(response.rows);
}

module.exports = {
    getCars,
    setCar,
    getClients,
    setClient,
    setSell,
    getSells
}