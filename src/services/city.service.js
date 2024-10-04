const City = require('../models/city.model');
const { Op } = require('sequelize'); 


const createCity = async (data) => {
  return await City.create(data);
};


const getAllCities = async (offset = 0, limit = 10, search = '') => {
  const whereClause = {};

  if (search) {
    whereClause[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { code: { [Op.iLike]: `%${search}%` } }
    ];
  }

  try {
    const result = await City.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      order: [['name', 'ASC']]
    });

    return result;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};


const getCityById = async (id) => {
  return await City.findByPk(id);
};

const updateCity = async (id, data) => {
  const city = await City.findByPk(id);
  if (!city) {
    throw new Error('City not found');
  }
  return await city.update(data);
};


const deleteCity = async (id) => {
  const city = await City.findByPk(id);
  if (!city) {
    throw new Error('City not found');
  }
  await city.destroy();
};

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
