const { Op } = require('sequelize');
const fs = require('fs');
const csvParser = require('csv-parser');
const cron = require('node-cron');
const Course = require('../models/course.model');
const City = require('../models/city.model');
const University = require('../models/university.model');
const Country = require('../models/country.model');
const pick = require('../utils/pick');
const pagination = require("../pagination/pagination");


const parseAndSaveCsv = async (filePath) => {
  let countryId = 1;
  let cityId = 1;
  let universityId = 1;
  let courseId = 1;

  const results = [];

  try {
    await Course.truncate({ cascade: true });
    await City.truncate({ cascade: true });
    await University.truncate({ cascade: true });
    await Country.truncate({ cascade: true });

    // Read and parse the CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => results.push(row))
        .on('end', () => resolve())
        .on('error', (error) => reject(new Error(`Error reading CSV file: ${error.message}`)));
    });

    for (const row of results) {
      try {
        const countryName = row.Country?.trim();
        const cityName = row.City?.trim();
        const universityName = row.University?.trim();
        const courseName = row.CourseName?.trim();
        const coursePrice = row.Price ? parseFloat(row.Price.trim()) : null;

        // Find or create Country
        let country;
        if (countryName) {
          country = await Country.findOrCreate({
            where: { name: countryName },
            defaults: { id: countryId++ }
          });
        }

        // Find or create City
        let city;
        if (cityName) {
          city = await City.findOrCreate({
            where: { name: cityName, countryId: country ? country[0].id : null },
            defaults: { id: cityId++ }
          });
        }

        // Find or create University
        let university;
        if (universityName) {
          university = await University.findOrCreate({
            where: { name: universityName },
            defaults: { id: universityId++ }
          });
        }

        // Create Course
        if (courseName) {
          await Course.create({
            id: courseId++,
            courseName: courseName,
            courseDescription: row.CourseDescription?.trim() || null,
            startDate: row.StartDate ? new Date(row.StartDate.trim()) : null,
            endDate: row.EndDate ? new Date(row.EndDate.trim()) : null,
            price: coursePrice,
            currency: row.Currency?.trim() || null,
            countryId: country ? country[0].id : null,
            cityId: city ? city[0].id : null,
            universityId: university ? university[0].id : null,
          });
        }
      } catch (rowError) {
        // Log a general message for row processing errors
        // console.error('Row processing error: An error occurred while processing this row.');
      }
    }
    return { message: 'CSV processing completed successfully.' };
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    throw new Error(`Unexpected error occurred: ${error.message}`);
  }
};

const filePath = '/home/user/Desktop/datareload/upload/University.csv';


cron.schedule('* * * * *', () => {
  console.log('Scheduled task is now running...');
  parseAndSaveCsv(filePath)
    .then(result => console.log(result.message))
    .catch(error => console.error(`Scheduled task error: ${error.message}`));
});

const createCourse = async (courseData) => {
  console.log('Creating course with data:', courseData);
  return Course.create(courseData);
};

const getCourseById = async (id) => {
  return Course.findByPk(id);
};


const updateCourse = async (id, courseData) => {
  console.log('Updating course with id:', id, 'and data:', courseData);
  return Course.update(courseData, { where: { id } });
};


const deleteCourse = async (id) => {
  return Course.destroy({ where: { id } });
};


async function getCourses(req, res) {
  try {
    const filter = pick(req.query, ['courseName', 'courseDescription']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    const limit = options.limit ? parseInt(options.limit) : 10;
    const page = options.page ? parseInt(options.page) : 1;
    const offset = (page - 1) * limit;

    let courseSearch = {};

    if (filter.courseName) {
      courseSearch.courseName = filter.courseName;
    }

    if (filter.courseDescription) {
      courseSearch.courseDescription = filter.courseDescription;
    }

    const course = await Course.findAndCountAll({
      where: courseSearch,
      include: [
        { model: City, as: 'CityData' },
        { model: University, as: 'UniversityData' },
        { model: Country, as: 'CountryData' }
      ],
      limit: limit,
      offset: offset,
      distinct: true,
    });

    const total = course.count;
    const totalPages = Math.ceil(total / limit);

    const result = {
      total,                          
      totalPages,                       
      data: course.rows                
    };

    res.status(200).json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching courses' });
  }
}



module.exports = {
  parseAndSaveCsv,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourses
};
