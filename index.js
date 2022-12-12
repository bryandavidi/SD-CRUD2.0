require("dotenv").config({path:'./src/.env'});
const express = require('express');
const sequelize = require('./database/database')
const bodyParser = require('body-parser');
const https = require("https");
const fs = require("fs");

const routes_course = require('./routes/routes_course');
const routes_inscription = require('./routes/routes_inscription');
const routes_student = require('./routes/routes_student');
const routes_auth = require('./routes/routes_auth');

const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 


async function main(){
    https.createServer({
        key: fs.readFileSync("key.pem"),
        cert: fs.readFileSync("cert.pem"),
    },app).listen(4000)
    console.log('Servidor corriendo en el puerto : ',4000)
    connDBAzure();
    app.use('/',routes_student);
    app.use('/',routes_course);
    app.use('/',routes_inscription);
    app.use('/',routes_auth);


    app.use('/',(req,res)=>{
        res.send('BIENVENIDO A LA API SIRA PARA EL CURSO DE SISTEMAS DISTRIBUIDOS 2022-2');
    })
};

async function connDBAzure(){
    try {
        await sequelize.sync();
        console.log('Conexion a la base de datos exitosa')
    } catch (error) {
        console.error(error, 'Conexion a la base de datos fallida')
    }
};

main();