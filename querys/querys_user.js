const { encrypt, compare} = require('../bcrypt/bcrypt');
const model_user = require ('../models/model_user');


const registerCtrl = async (req,res) => {
    try {
        const{usuario,contrasena} = req.body
        const passwordHash = await encrypt(contrasena);
        console.log(passwordHash)
        const registerUser = await model_user.create({
            usuario,
            contrasena: passwordHash
        });
        res.send('usuario creado con exito');
    } catch (error) {
        res.status(400)
    }
}

module.exports.registerCtrl = registerCtrl