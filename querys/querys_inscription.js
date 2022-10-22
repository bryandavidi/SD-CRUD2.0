const model_inscription = require ('../models/model_inscription');

const getInscription = async(req,res)=>{
    try {
        const inscripition = await model_inscription.findAll();
        res.status(200).json(inscripition);
    } catch (error) {
        res.status(500)
    }
};


const getInscriptionId = async(req,res)=>{
    const {id_estudiante,id_materia} = req.body
    try {
        const inscription = await model_inscription.findAll( 
            {
                where :{
                    id_estudiante
                } 
            }
        );
        res.status(200).json(inscription);
    } catch (error) {
        res.status(500)
    }
};


const createInscription = async(req,res)=>{
    const {id_estudiante,id_materia,fecha_inscripcion} = req.body
    try {
        const inscription = await model_inscription.create({
        id_estudiante,
        id_materia,
        fecha_inscripcion
        })
        res.status(201).send('Inscripcion creada')
    } catch (error) {
        res.status(400);
    }
};


const deleteInscription = async(req,res)=>{
    const {id_estudiante,id_materia} = req.body
    try {
        const inscripition = await model_inscription.destroy({
            where:{
                id_estudiante,
                id_materia
            }
        })
        res.status(202).send('Inscripcion eliminada')
    } catch (error) {
        res.status(500)
    }
};

module.exports.getInscription = getInscription;
module.exports.getInscriptionId = getInscriptionId;
module.exports.createInscription = createInscription;
module.exports.deleteInscription = deleteInscription;