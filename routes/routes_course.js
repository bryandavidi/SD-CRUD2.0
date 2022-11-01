const express = require('express');
const routes_course = express.Router();
const { getCourses, getCourseId, deleteCourse, createCourse, getActiveCourses, updateCourse } = require('../querys/querys_course');
const { verifyToken } = require('../token/token');

routes_course.get('/materias/todas',verifyToken,getCourses);

routes_course.get('/materias/id',verifyToken,getCourseId);

routes_course.get('/materias/activas',verifyToken,getActiveCourses);

routes_course.post('/materias/crear',verifyToken,createCourse);

routes_course.delete('/materias/eliminar',verifyToken,deleteCourse);

routes_course.put('/materias/actualizar/:id',verifyToken,updateCourse);

module.exports = routes_course;