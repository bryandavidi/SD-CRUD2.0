const { Sequelize } = require("sequelize");
require("dotenv").config({path:'./src/.env'});

const sequelize = new Sequelize(
    process.env.DATABASE,
    'Bryan',
    process.env.PASSWORD,
    {
    host: process.env.HOSTDB,
    port: process.env.PORTDB,
    logging:false,
    native:false,
    dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    }
);

module.exports= sequelize;
