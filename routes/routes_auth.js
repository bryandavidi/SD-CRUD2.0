const express = require('express');
const routes_auth = express.Router();
const {registerCtrl,loginCtrl} = require('../querys/querys_auth');

routes_auth.post('/auth/login',loginCtrl)
routes_auth.post('/auth/registrar',registerCtrl);

module.exports = routes_auth;