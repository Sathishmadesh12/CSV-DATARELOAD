const express = require('express');
const router = express.Router();
const cityController = require('../../controllers/city.controller'); 

router.post('/', cityController.createCity); 
router.get('/', cityController.getAllCities); 
router.get('/:id', cityController.getCity);
router.put('/:id', cityController.updateCity); 
router.delete('/:id', cityController.deleteCity); 
module.exports = router;
