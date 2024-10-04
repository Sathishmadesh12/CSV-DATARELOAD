const express = require('express');
const CourseController = require('../../controllers/course.controller');
const { validateCourse, validateRequest } = require('../../validations/course.validation');

const router = express.Router();

// Course Routes
router.get('/', CourseController.getCourses);
router.post('/upload', CourseController.upload);
router.post('/', validateCourse, validateRequest, CourseController.createCourse);
router.get('/:id', CourseController.getCourse);
router.put('/:id', validateCourse, validateRequest, CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);

module.exports = router;

