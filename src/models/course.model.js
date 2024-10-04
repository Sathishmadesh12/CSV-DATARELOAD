const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const City = require('./city.model'); 
const Country = require('./country.model'); 
const University = require('./university.model');


const Course = sequelize.define('course', {
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseDescription: {
    type: DataTypes.STRING,
  },
  startDate: {
    type: DataTypes.DATE,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  currency: {
    type: DataTypes.STRING,
  },
  countryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'countries',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  universityId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'universities',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  cityId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'cities',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
});

Course.hasOne(City, { as: 'CityData', sourceKey: 'cityId', foreignKey: 'id' });
Course.hasOne(University, { as: 'UniversityData', sourceKey: 'universityId', foreignKey: 'id' });
Course.hasOne(Country, { as: 'CountryData', sourceKey: 'countryId', foreignKey: 'id' });

module.exports = Course;