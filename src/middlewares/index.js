const Course = require('../models/course.model');
const City = require('../models/city.model');
const Country = require('../models/country.model');
const University = require('../models/university.model');

// Define associations
City.belongsTo(Country, { as: 'country', foreignKey: 'countryId' });
Country.hasMany(City, { as: 'cities', foreignKey: 'countryId' });

University.belongsTo(City, { as: 'city', foreignKey: 'cityId' });
City.hasMany(University, { as: 'universities', foreignKey: 'cityId' });

Course.belongsTo(City, { as: 'city', foreignKey: 'cityId' });
City.hasMany(Course, { as: 'courses', foreignKey: 'cityId' });

Course.belongsTo(University, { as: 'university', foreignKey: 'universityId' });
University.hasMany(Course, { as: 'courses', foreignKey: 'universityId' });

module.exports = {
  Course,
  City,
  Country,
  University
};
