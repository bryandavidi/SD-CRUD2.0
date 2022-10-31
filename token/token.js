const jwt = require('jsonwebtoken');
require("dotenv").config({path:'./src/.env'});


function tokenSign (user) {
    return jwt.sign(
        {
            user: {
                id_usuario : user.id_usuario,
                usuario: user.usuario
            }
        },
    process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ').pop()
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenData.user.id_usuario){
            next()
        }

    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports.tokenSign = tokenSign;
module.exports.verifyToken = verifyToken;