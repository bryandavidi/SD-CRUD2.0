const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const model_student = sequelize.define('estudiantes',{
    id_estudiante : {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    codigo_estudiante : {
        type: DataTypes.INTEGER
    },
    tipo_documento :{
        type: DataTypes.STRING
    },
    numero_documento :{
        type: DataTypes.STRING
    },
    nombres : {
        type: DataTypes.STRING
    },
    apellidos :{
        type: DataTypes.STRING
    },
    estado :{
        type: DataTypes.STRING
    },
    }, 
    {
    timestamps: false,
});

module.exports = model_student;


