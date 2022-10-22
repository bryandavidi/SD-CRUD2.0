const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const model_course = sequelize.define('materias',{
    id_materia : {
        type: DataTypes.NUMBER,
        primaryKey:true
    },
    codigo_materia : {
        type: DataTypes.STRING
    },
    nombre_materia :{
        type: DataTypes.STRING
    },
    creditos_materia :{
        type: DataTypes.NUMBER
    },
    cupos: {
        type: DataTypes.NUMBER
    },
    estado_activo :{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    }, {
         timestamps: false,
         
});

module.exports = model_course;
