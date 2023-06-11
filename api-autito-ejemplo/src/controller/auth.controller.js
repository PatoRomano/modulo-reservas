const { encrypt, compare} = require('../helpers/handleBcrypt');
const usuarioModel = require('../models/usuarioModel');

const registerCtrl = async (req,res)  => {

    try{
        const {nombre, apellido, correo, contraseña, id_empresa} = req.body;
        const passHash = await encrypt(contraseña);
        const registerUser = await usuarioModel.setUser({
            nombre,
            apellido,
            correo,
            contraseña: passHash,
            id_empresa
        });
       console.log(registerUser)
        res.send({data: registerUser})

    }catch{
        console.log("error al registrar usuario");
    }
}

const loginCtrl = async (req, res) => {
    try{
        const {correo, contraseña} = req.body;  
        const user = await usuarioModel.findOne({
            correo
        });
        console.log(user)
        if (user[0] && compare(contraseña, user[0].contraseña)) {
            res.send({data: user})
          } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
          }
    }catch{
        console.log("error al iniciar sesion");
    }
}
module.exports = {registerCtrl, loginCtrl}