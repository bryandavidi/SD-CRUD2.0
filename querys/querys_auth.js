const { encrypt, compare} = require('../bcrypt/bcrypt');
const  {tokenSign}  = require('../token/token');
const model_user = require ('../models/model_user');


const registerCtrl = async (req,res) => {
    try {
        const{usuario,contrasena} = req.body
        const passwordHash = await encrypt(contrasena);
        const registerUser = await model_user.create({
            usuario,
            contrasena: passwordHash
        });
        res.send('usuario creado con exito');
    } catch (error) {
        res.status(400)
    }
}

const loginCtrl = async(req,res) => {
    try {
        const{usuario,contrasena} = req.body
        const user = await model_user.findOne(
            {
                where:{
                    usuario :usuario
                }
            }
            );
            
        if(!user){
            res.send({error : 'Error user no found',})
            res.status(404)
        }

        const checkPassword = await compare(contrasena, user.contrasena)
        const tokenSession = tokenSign(user)
        if(checkPassword){
            res.send({
                data: user,
                token : tokenSession
            })
        }else{
            res.send('contrasena incorrecta')
            res.status(409)
        }
    } catch (error) {
        res.status(400)
    }
}

module.exports.registerCtrl = registerCtrl;
module.exports.loginCtrl = loginCtrl;