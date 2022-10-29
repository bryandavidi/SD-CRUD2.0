const express = require('express');
const routes_user = express.Router()

const {registerCtrl} = require('../querys/querys_user');


routes_user.post('/usuarios/registrar',registerCtrl);


module.exports = routes_user;