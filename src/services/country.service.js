const Country = require('../models/country.model');
const { Op } = require('sequelize');


const createCountry = async (data) => {
  return await Country.create(data);
};

const getAllCountries = async (offset = 0, limit = 10, search = '') => {
  const whereClause = {};

 
  if (search) {
    whereClause[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } }, 
      { code: { [Op.iLike]: `%${search}%` } } 
    ];
  }

  return await Country.findAndCountAll({
    where: whereClause,
    offset,
    limit,
    order: [['name', 'ASC']], 
  });
};

const getCountryById = async (id) => {
  return await Country.findByPk(id);
};


const updateCountry = async (id, data) => {
  const country = await Country.findByPk(id);
  if (!country) throw new Error('Country not found');
  return await country.update(data);
};

const deleteCountry = async (id) => {
  const country = await Country.findByPk(id);
  if (!country) throw new Error('Country not found');
  return await country.destroy();
};

module.exports = {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
};
