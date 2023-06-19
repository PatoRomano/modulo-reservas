const Axios = require('axios')

const getArbitros = async (req,res)  => {
    const response = await Axios({
        url: `http://localhost:3002/arbitros/`,
        method: "GET",
        data: {}
    })
    res.status(200).json(response);
}

module.exports = {getArbitros}