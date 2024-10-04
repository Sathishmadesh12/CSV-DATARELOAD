const httpStatus = require('http-status');
const CourseService = require('../services/course.service');
const path = require('path');
const fs = require('fs');
const { log } = require('util');


class CourseController {
  async upload(req, res) {
    const filePath = path.resolve('/home/user/Desktop/datareload/upload/University.csv');
    console.log('dssu',filePath)

    try {
      const results = await CourseService.parseAndSaveCsv(filePath);
      console.log(results)
      res.status(httpStatus.CREATED).send({
        message: 'CSV data successfully uploaded and inserted into the database',
        data: results,
      });
    } catch (error) {
      console.error('Error uploading CSV:', error);
      res.status(httpStatus.BAD_REQUEST).send({
        message: 'Error uploading CSV data',
        error: error.message || 'Unknown error',
      });
    }
  }

  async createCourse(req, res) {
    try {
      const course = await CourseService.createCourse(req.body);
      res.status(httpStatus.CREATED).json(course);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }


  async getCourse(req, res) {
    try {
      const course = await CourseService.getCourseById(req.params.id);
      if (!course) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Course not found' });
      }
      res.status(httpStatus.OK).json(course);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }


  async updateCourse(req, res) {
    try {
      const updated = await CourseService.updateCourse(req.params.id, req.body);
      if (updated[0] === 0) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Course not found or no changes made' });
      }
      res.status(httpStatus.OK).json({ message: 'Course updated successfully' });
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }


  async deleteCourse(req, res) {
    try {
      const deleted = await CourseService.deleteCourse(req.params.id);
      if (deleted === 0) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Course not found' });
      }
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }


  async getCourses(req, res) {
    try {
      const result = await CourseService.getCourses(req, res);
      res.send(result)
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}

module.exports = new CourseController();
