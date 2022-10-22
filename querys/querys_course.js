const model_course = require ('../models/model_course');

const getCourses = async(req,res)=>{
    try {
        const courses = await model_course.findAll();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500)
    }
};

const getCourseId = async(req,res)=>{
    const {id_materia} = req.body;
    try {
        const course = await model_course.findOne( 
            {
                where :{
                    id_materia
                }
            }
        );
        res.status(200).json(course);
    } catch (error) {
        res.status(500)
    }
};

const getActiveCourses = async(req,res)=>{
    try {
        const courses = await model_course.findAll( 
            {
                attributes : ['nombre_materia','cupos'],
                where :{
                    estado_activo: true
                }
            }
        );
        res.status(200).json(courses);
    } catch (error) {
        res.status(500)
    }
};

const createCourse = async(req,res)=>{
    const {id_materia,codigo_materia,nombre_materia,creditos_materia,cupos,estado_activo} = req.body;
    try {
        const course = await model_course.create({
        id_materia,
        codigo_materia,
        nombre_materia,
        creditos_materia,
        cupos,
        estado_activo
    })
        res.status(201).send('Materia creada')
    } catch (error) {
        res.status(400);
    }
};

const updateCourse = async(req,res)=>{
    const {id} = req.params;
        try {
        const course = await model_course.findOne( 
            {
                where :{
                    id_materia : id
                }
            }
        );
        course.set(req.body);
        await course.save();
        res.json(course);
    res.status(202).send('Materia actualizada')
    } catch (error) {
        res.status(500)
    }
};


const deleteCourse = async(req,res)=>{
    const {id_materia} = req.body;
        try {
        const course = await model_course.destroy({
            where:{
                id_materia
            }
        })
        res.status(202).send('Materia eliminada')
    } catch (error) {
        res.status(500)
    }
};


module.exports.getCourses = getCourses;
module.exports.getCourseId = getCourseId;
module.exports.getActiveCourses = getActiveCourses;
module.exports.createCourse = createCourse;
module.exports.updateCourse = updateCourse;
module.exports.deleteCourse = deleteCourse;