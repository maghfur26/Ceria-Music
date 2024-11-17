const express = require('express');
const facilityRoute = express.Router();
const authMiddleware = require('../middleware/auth');
const facilityController = require('../controllers/facilityController');

facilityRoute.post('/create', authMiddleware, facilityController.createFacility)

module.exports = facilityRoute