const express = require('express');
const facilityRoute = express.Router();
const authMiddleware = require('../middleware/auth');
const facilityController = require('../controllers/facilityController');

facilityRoute.get('/facilities', authMiddleware, facilityController.getUserFacilities)
facilityRoute.get('/facility/:id', authMiddleware, facilityController.getFacility)
facilityRoute.put('/facility:id', authMiddleware, facilityController.updateFacility)
facilityRoute.post('/facility', authMiddleware, facilityController.createFacility)
facilityRoute.delete('/facility:id', authMiddleware, facilityController.deleteFacility)

module.exports = facilityRoute