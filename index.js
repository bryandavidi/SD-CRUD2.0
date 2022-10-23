require("dotenv").config({path:'./src/.env'});
const express = require('express');
const sequelize = require('./database/database')
const bodyParser =require('body-parser');
const routes_course = require('./routes/routes_course');
const router_inscription = require('./routes/routes_inscription');
const routes_student = require('./routes/routes_student');

const app = express();

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


async function main(){
    app.listen(process.env.PORT)
    console.log('Servidor corriendo en el puerto : ', process.env.PORT)
    connDBAzure();
    app.use('/',routes_student);
    app.use('/',routes_course);
    app.use('/',router_inscription);

    app.use('/',(req,res)=>{
        res.send('WELCOME');
    })
};

async function connDBAzure(){
    try {
        await sequelize.sync();
        console.log('Conexion a la base de datos Azure exitosa')
    } catch (error) {
        console.error(error, 'Conexion a la base de datos fallida')
    }
};

main();