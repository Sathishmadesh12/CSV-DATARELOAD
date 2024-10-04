const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');


const City = sequelize.define('city', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  code: {
    type: DataTypes.STRING, 
   
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
     allowNull: false,
  },
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'countries', 
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});


module.exports = City;
