const DataTypes  = require('sequelize');
const sequelize = require('../config/db.config'); 

const University = sequelize.define('university', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  
  address: {
    type: DataTypes.STRING,
    
  },

  code: {
    type: DataTypes.STRING,
 
  },

  establishedYear: {
    type: DataTypes.INTEGER,
  },

  location: {
    type: DataTypes.STRING,

  },  
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
   allowNull: false,
},
});

module.exports = University;
