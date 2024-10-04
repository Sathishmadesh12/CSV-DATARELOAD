const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Country = sequelize.define('country', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
   
  },
  code: {
    type: DataTypes.STRING,
  },  
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
    allowNull: false,
  },
});

module.exports = Country;
