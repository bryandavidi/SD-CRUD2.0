const express = require('express');
const {getInscription, getInscriptionId, deleteInscription, createInscription } = require('../querys/querys_inscription');
const routes_inscription = express.Router()
const { verifyToken } = require('../token/token');


routes_inscription.get('/inscripciones/todas',verifyToken,getInscription);

routes_inscription.get('/inscripciones/id',verifyToken,getInscriptionId);

routes_inscription.post('/inscripciones/crear',verifyToken,createInscription);

routes_inscription.delete('/inscripciones/eliminar',verifyToken,deleteInscription);


module.exports = routes_inscription;