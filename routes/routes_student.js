const express = require('express');
const multer = require('multer');
const routes_student = express.Router();
const { getStudents, getStudentsId, getActiveStudents, createStudent,updateStudent,deleteStudent} = require('../querys/querys_student');
const { verifyToken } = require('../token/token');


const upload = multer();

routes_student.get('/estudiantes/todos',verifyToken,getStudents);

routes_student.get('/estudiantes/id',verifyToken,getStudentsId);

routes_student.get('/estudiantes/activos',verifyToken,getActiveStudents);

routes_student.post('/estudiantes/crear',verifyToken,upload.single("file"),createStudent);

routes_student.put('/estudiantes/actualizar/:id',verifyToken,updateStudent);

routes_student.delete('/estudiantes/eliminar',verifyToken,deleteStudent);

module.exports = routes_student;