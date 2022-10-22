const express = require('express');
const {getInscription, getInscriptionId, deleteInscription, createInscription } = require('../querys/querys_inscription');
const routes_inscription = express.Router()

routes_inscription.get('/inscripciones/todas',getInscription);

routes_inscription.get('/inscripciones/id',getInscriptionId);

routes_inscription.post('/inscripciones/crear',createInscription);

routes_inscription.delete('/inscripciones/eliminar',deleteInscription);


module.exports = routes_inscription;