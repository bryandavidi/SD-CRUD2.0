const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");


const model_user = sequelize.define('usuarios',{
    id_usuario : {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    usuario : {
        type: DataTypes.STRING
    },
    contrasena :{
        type: DataTypes.STRING
    },
    }, {
         timestamps: false,
         
});

module.exports = model_user;
