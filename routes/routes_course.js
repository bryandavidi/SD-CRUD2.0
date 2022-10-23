const express = require('express');
const routes_course = express.Router();
const { getCourses, getCourseId, deleteCourse, createCourse, getActiveCourses, updateCourse } = require('../querys/querys_course');

routes_course.get('/materias/todas',getCourses);

routes_course.get('/materias/id',getCourseId);

routes_course.get('/materias/activas',getActiveCourses);

routes_course.post('/materias/crear',createCourse);

routes_course.delete('/materias/eliminar',deleteCourse);

routes_course.put('/materias/actualizar/:id',updateCourse);

module.exports = routes_course;