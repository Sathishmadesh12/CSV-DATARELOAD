const httpStatus = require('http-status');
const universityService = require('../services/university.service');
const validateUniversity = require('../validations/university.validation');


const createUniversity = async (req, res) => {
  try {
    const data = req.body;
    validateUniversity(data); 
    const result = await universityService.createUniversity(data);
    res.status(httpStatus.CREATED).json(result);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};


const getAllUniversities = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;
    const result = await universityService.getAllUniversities(offset, limit, search);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};


const getUniversityById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await universityService.getUniversityById(id);
    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'University not found' });
    }
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};


const updateUniversity = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = req.body;
    validateUniversity(data); 
    const result = await universityService.updateUniversity(id, data);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};


const deleteUniversity = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await universityService.deleteUniversity(id);
    res.status(httpStatus.OK).json({ message: 'University deleted successfully' });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
};
