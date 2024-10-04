const express = require('express');
const router = express.Router();
const countryController = require('../../controllers/country.controller');

router.post('/', countryController.createCountry);
router.get('/', countryController.getAllCountries);
router.get('/:id', countryController.getCountry);
router.put('/:id', countryController.updateCountry);
router.delete('/:id', countryController.deleteCountry);



module.exports = router;

