
const { uploadBlob, deleteBlob } = require('../file_server/blob');
const model_student = require ('../models/model_student');
const model_inscription = require ('../models/model_inscription');
require("dotenv").config({path:'./src/.env'});
const redis = require("redis");

 
const client = redis.createClient({
    url: "rediss://red-cdt9fk5a49935ki33v70:i05o7KLTrYmHFqje01rw0xX4r2l8geFB@ohio-redis.render.com:6379",
    expire: 10
    
});

client.connect();

client.on("connect", function(err){
  console.log("Conexion a redis")
})

const getStudents = async(req,res)=>{
    console.log("Cache response : " + await client.ping());
    let keyName = 'studentsGet'
    let getCacheData = await client.get(keyName);
    let responseArray = ''
    try {
        if(getCacheData){
            responseArray = getCacheData
            res.status(200).json(JSON.parse(responseArray));
        }else {
            const students = await model_student.findAll();
            client.set(keyName,JSON.stringify(students));
            client.expire('studentsGet', 5)
            res.status(200).json(students);
        }
        }
        catch (error) {
        res.status(500)
    }
    

};

// const getStudents = async(req,res)=>{
//     try {
//         const students = await model_student.findAll();
//         res.status(200).json(students);
//     } catch (error) {
//         res.status(500)
//     }
// };

const getStudentsId = async(req,res)=>{
    let {id_estudiante} = req.body;
    try {
        const students = await model_student.findOne( 
            {
                where :{
                    id_estudiante
                } 
            }
        );
        res.status(200).json(students);
    } catch (error) {
        res.status(500)
    }
};

const getActiveStudents = async(req,res)=>{
    try {
        const students = await model_student.findAll( 
            {
                attributes : ['nombres','apellidos','codigo_estudiante','numero_documento' ],
                where:{
                    estado: "Matriculado"
                }
            }
        );
        res.status(200).json(students);
    } catch (error) {
        res.status(500)
    }
};

const createStudent = async(req,res)=>{
    const {container, id_estudiante, codigo_estudiante, tipo_documento, numero_documento, nombres, apellidos, estado} = req.body;
    const{originalname,buffer} = req.file;
    try {
        const students = await model_student.create({
        id_estudiante,
        codigo_estudiante,
        tipo_documento,
        numero_documento,
        nombres,
        apellidos,
        estado,
        imagen : "https://imagenesira.blob.core.windows.net/imagenesira/" + originalname
    })
    res.status(201).send('Estudiante creado')
    uploadBlob(container,originalname,buffer);
    } catch (error) {
        res.status(400);
    }
};

const updateStudent = async(req,res)=>{
    const {id} = req.params;
    try {
        const student = await model_student.findOne( 
            {
                where :{
                    id_estudiante: id
                }
            }
        );
        student.set(req.body);
        await student.save();
        res.json(student);
        res.status(201).send('Estudiante actualizado')
    } catch (error) {
        res.status(400);
    }
};


const deleteStudent = async(req,res)=>{
    const {id_estudiante,container} = req.body;
    const filename = id_estudiante+".png"
    try {
        const inscription = await model_inscription.destroy(
            {
            where:{
                id_estudiante
            }
        }
        ) 
        const students = await model_student.destroy({
            where:{
                id_estudiante
            }
        })
        res.status(202).send("Estudiante eliminado")
        deleteBlob(container,filename);
    } catch (error) {
        res.status(500)
    }
};


module.exports.getStudents = getStudents;
module.exports.getStudentsId = getStudentsId;
module.exports.getActiveStudents = getActiveStudents;
module.exports.createStudent = createStudent;
module.exports.updateStudent = updateStudent;
module.exports.deleteStudent = deleteStudent;


