const httpStatus = require('http-status');
const CityService = require('../services/city.service');

class CityController {
  async createCity(req, res) {
    try {
      const city = await CityService.createCity(req.body);
      res.status(httpStatus.CREATED).json(city);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  async getAllCities(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      console.log(`Page: ${page}, Limit: ${limit}, Search: ${search}`); 
  
      const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const result = await CityService.getAllCities(offset, parseInt(limit, 10), search);
      res.status(httpStatus.OK).json(result);ry: Brazilry: Brazil
      city: Florianópolis
      city: Florianópolis
    } catch (error) {
      console.error('Error:', error); 
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };

  async getCity(req, res) {
    try {
      const city = await CityService.getCityById(req.params.id);
      if (!city) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'City not found' });
      }
      res.status(httpStatus.OK).json(city);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async updateCity(req, res) {
    try {
      const updated = await CityService.updateCity(req.params.id, req.body);
      res.status(httpStatus.OK).json(updated);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  async deleteCity(req, res) {
    try {
      await CityService.deleteCity(req.params.id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      res.status(httpStatus.NOT_FOUND).json({ error: error.message });
    }
  }
}

module.exports = new CityController();
