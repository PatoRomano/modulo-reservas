const { encrypt } = require('../helpers/handleBcrypt');
const userModel = require('../models/userModel');

const registerCtrl = async (req,res)  => {

    try{
        const {name, lastname, email, password} = req.body;
        const passHash = await encrypt(password);
        const registerUser = await userModel.setUser({
            name,
            lastname,
            email,
            password: passHash
        });
       
        res.send({data: registerUser})

    }catch{
        console.log("error al registrar usuario");
    }
}

const loginCtrl = async (req, res) => {
    try{
        const {email, password} = req.body;  
        const user = await userModel.findOne({
            email
        });
        res.send({data: user})

    }catch{
        console.log("error al registrar usuario");
    }
}
module.exports = {registerCtrl, loginCtrl}