const httpStatus = require('http-status');
const CountryService = require('../services/country.service');

class CountryController {
  async createCountry(req, res) {
    try {
      const country = await CountryService.createCountry(req.body);
      res.status(httpStatus.CREATED).json(country);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  async getAllCountries(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const offset = (page - 1) * limit;
      const result = await CountryService.getAllCountries(offset, parseInt(limit, 10), search);
      res.status(httpStatus.OK).json(result);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async getCountry(req, res) {
    try {
      const country = await CountryService.getCountryById(req.params.id);
      if (!country) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Country not found' });
      }
      res.status(httpStatus.OK).json(country);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async updateCountry(req, res) {
    try {
      const updated = await CountryService.updateCountry(req.params.id, req.body);
      res.status(httpStatus.OK).json(updated);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  async deleteCountry(req, res) {
    try {
      await CountryService.deleteCountry(req.params.id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      res.status(httpStatus.NOT_FOUND).json({ error: error.message });
    }
  }
}

module.exports = new CountryController();
