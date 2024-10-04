const { Op } = require('sequelize');
const University = require('../models/university.model');


const createUniversity = async (data) => {
  return await University.create(data);
};

const getAllUniversities = async (offset, limit, search = '') => {
  const whereClause = {};

  if (search) {
    whereClause[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } }, 
      { code: { [Op.iLike]: `%${search}%` } } 
    ];
  }

  return await University.findAndCountAll({
    where: whereClause,
    offset,
    limit,
  });
};


const getUniversityById = async (id) => {
  return await University.findByPk(id);
};

const updateUniversity = async (id, data) => {
  const university = await University.findByPk(id);
  if (!university) throw new Error('University not found');
  return await university.update(data);
};

const deleteUniversity = async (id) => {
  const university = await University.findByPk(id);
  if (!university) throw new Error('University not found');
  return await university.destroy();
};

module.exports = {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
};
