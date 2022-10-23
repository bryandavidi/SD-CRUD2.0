const express = require('express');
const multer = require('multer');
const routes_student = express.Router();
const { getStudents, getStudentsId, getActiveStudents, createStudent,updateStudent,deleteStudent} = require('../querys/querys_student');

const upload = multer();
routes_student.get('/estudiantes/todos',getStudents);
routes_student.get('/estudiantes/id',getStudentsId);
routes_student.get('/estudiantes/activos',getActiveStudents);
routes_student.post('/estudiantes/crear',upload.single("file"),createStudent);
routes_student.put('/estudiantes/actualizar/:id',updateStudent);
routes_student.delete('/estudiantes/eliminar',deleteStudent);

module.exports = routes_student