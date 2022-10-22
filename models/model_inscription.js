const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const model_inscription = sequelize.define('inscripciones',{
    id_estudiante : {
        type: DataTypes.NUMBER,
        primaryKey:true
    },
    id_materia : {
        type: DataTypes.NUMBER,
        primaryKey:true},
    fecha_inscripcion : {
        type: DataTypes.DATE,
    },
    }, {
        timestamps: false,
         
});

module.exports = model_inscription;
