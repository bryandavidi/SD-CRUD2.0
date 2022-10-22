const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('sira','Bryan','Sistemasdistribuidos2022',{
host: 'sira.postgres.database.azure.com',
port: 5432,
logging:false,
native:false,
dialect: 'postgres',
dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
 },
});


module.exports = sequelize;
