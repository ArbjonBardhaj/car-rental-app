const express = require('express');
const carController = require('../controllers/carsController');

const router = express.Router();

// Get all cars
router.get('/', carController.getAllCars);

// Get a single car by ID
router.get('/:id', carController.getCarById);

// Create a new car
router.post('/', carController.addCar);

// Update a car by ID
router.put('/:id', carController.updateCar);

// Delete a car by ID
router.delete('/:id', carController.deleteCar);

module.exports = router;